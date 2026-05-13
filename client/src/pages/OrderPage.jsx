import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import API from '../utils/api';

export default function OrderPage() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/api/orders/${id}`);
      setOrder(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrder(); }, [id]);

  const handleMarkPaid = async () => {
    setPaying(true);
    try {
      await API.put(`/api/orders/${id}/pay`, { paid: true });
      fetchOrder();
    } catch (err) {
      setError('Payment failed');
    } finally {
      setPaying(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="max-w-4xl mx-auto p-4"><Message type="error">{error}</Message></div>;
  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Order #{order._id}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Shipping */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Shipping</h2>
            <p className="text-sm"><strong>Name:</strong> {order.user.name}</p>
            <p className="text-sm"><strong>Email:</strong> {order.user.email}</p>
            <p className="text-sm mt-1">
              {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <div className="mt-2">
              {order.isDelivered
                ? <Message type="success">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</Message>
                : <Message type="warning">Not Delivered</Message>}
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Payment</h2>
            <p className="text-sm"><strong>Method:</strong> {order.paymentMethod}</p>
            <div className="mt-2">
              {order.isPaid
                ? <Message type="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message>
                : <Message type="error">Not Paid</Message>}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-3">Order Items</h2>
            {order.orderItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain" />
                <div className="flex-1">
                  <Link to={`/product/${item.product}`} className="text-blue-600 hover:underline text-sm">{item.name}</Link>
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
            { label: 'Items', value: `$${order.itemsPrice}` },
            { label: 'Shipping', value: order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice}` },
            { label: 'Tax', value: `$${order.taxPrice}` },
            { label: 'Total', value: `$${order.totalPrice}`, bold: true },
          ].map(({ label, value, bold }) => (
            <div key={label} className={`flex justify-between text-sm ${bold ? 'font-bold border-t pt-2 text-base' : ''}`}>
              <span>{label}:</span>
              <span>{value}</span>
            </div>
          ))}
          {!order.isPaid && (
            <button
              onClick={handleMarkPaid}
              disabled={paying}
              className="w-full mt-3 bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2 rounded-full text-sm"
            >
              {paying ? 'Processing...' : '💳 Pay Now (Demo)'}
            </button>
          )}
          <Link to="/" className="block text-center text-blue-600 hover:underline text-sm mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
