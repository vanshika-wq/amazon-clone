import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import API from '../utils/api';

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) navigate('/login');
    if (!shippingAddress) navigate('/shipping');
  }, []);

  const itemsPrice = cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = +(itemsPrice * 0.15).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/api/orders', {
        orderItems: cartItems.map((i) => ({ ...i, product: i._id })),
        shippingAddress,
        paymentMethod: 'PayPal',
        itemsPrice: +itemsPrice.toFixed(2),
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      dispatch(clearCart());
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <CheckoutSteps step1 step2 step3 />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Shipping */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            {shippingAddress && (
              <p className="text-sm text-gray-700">
                {shippingAddress.address}, {shippingAddress.city},{' '}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Payment Method</h2>
            <p className="text-sm text-gray-700">PayPal / Credit Card</p>
          </div>

          {/* Items */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-3">Order Items</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                <div className="flex-1">
                  <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline text-sm">{item.name}</Link>
                </div>
                <p className="text-sm whitespace-nowrap">{item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong></p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded shadow p-4 h-fit space-y-3 border">
          <h2 className="text-lg font-bold">Order Summary</h2>
          {[
            { label: 'Items', value: itemsPrice.toFixed(2) },
            { label: 'Shipping', value: shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}` },
            { label: 'Tax (15%)', value: taxPrice.toFixed(2) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm">
              <span>{label}:</span>
              <span>{typeof value === 'string' && value !== 'FREE' ? `$${value}` : value}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-base border-t pt-2">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          {error && <Message type="error">{error}</Message>}
          <button
            onClick={handlePlaceOrder}
            disabled={loading || cartItems.length === 0}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2.5 rounded-full text-sm transition disabled:opacity-50"
          >
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}
