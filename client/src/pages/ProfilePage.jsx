import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import API from '../utils/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) { navigate('/login'); return; }
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/api/orders/myorders');
        setOrders(data);
      } catch (err) {
        setError('Could not load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userInfo]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded shadow p-4 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-amazon-yellow flex items-center justify-center text-2xl font-bold text-black mb-3">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-bold">{userInfo?.name}</h2>
            <p className="text-sm text-gray-500">{userInfo?.email}</p>
            {userInfo?.isAdmin && <span className="mt-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">Admin</span>}
          </div>
        </div>
        <div className="md:col-span-3">
          <h2 className="text-lg font-bold mb-4">My Orders</h2>
          {loading ? <Loader /> : error ? <Message type="error">{error}</Message> : orders.length === 0 ? (
            <Message type="info">You have no orders yet.</Message>
          ) : (
            <div className="bg-white rounded shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    {['Order ID', 'Date', 'Total', 'Paid', 'Delivered', ''].map(h => (
                      <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-xs">{order._id.slice(-8)}</td>
                      <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2 font-bold">${order.totalPrice}</td>
                      <td className="px-4 py-2">
                        {order.isPaid ? <span className="text-green-600">✔ {new Date(order.paidAt).toLocaleDateString()}</span> : <span className="text-red-500">✘</span>}
                      </td>
                      <td className="px-4 py-2">
                        {order.isDelivered ? <span className="text-green-600">✔</span> : <span className="text-red-500">✘</span>}
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={() => navigate(`/order/${order._id}`)} className="text-blue-600 hover:underline text-xs">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
