import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import Message from '../components/Message';

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => {
    if (!userInfo) navigate('/login?redirect=shipping');
    else navigate('/shipping');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-600 mb-4">Your Amazon Cart is empty</p>
          <Link to="/" className="bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold px-6 py-2 rounded-full">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-white rounded shadow p-4 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item._id}`} className="text-blue-600 hover:underline text-sm font-medium line-clamp-2">
                    {item.name}
                  </Link>
                  <p className="text-green-600 text-sm mt-1">In Stock</p>
                  <div className="flex items-center gap-3 mt-2">
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart({ ...item, qty: Number(e.target.value) }))}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <span className="text-gray-300">|</span>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-blue-600 hover:text-red-500 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
            <div className="text-right text-lg font-bold text-gray-800 pt-2">
              Subtotal ({totalItems} items): <span className="text-xl">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded shadow p-4 h-fit space-y-3 border">
            <p className="text-green-600 font-medium text-sm">✔ Your order qualifies for FREE Delivery.</p>
            <p className="text-lg font-bold">
              Subtotal ({totalItems} items):{' '}
              <span className="text-xl">${subtotal.toFixed(2)}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2.5 rounded-full text-sm transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
