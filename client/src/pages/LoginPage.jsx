import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/userSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import API from '../utils/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) navigate(redirect === 'shipping' ? '/shipping' : '/');
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/api/users/login', { email, password });
      dispatch(setCredentials(data));
      navigate(redirect === 'shipping' ? '/shipping' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
      <Link to="/">
        <span className="text-black font-bold text-3xl">amazon</span>
        <span className="text-amazon-yellow font-bold text-3xl">.clone</span>
      </Link>

      <div className="w-full max-w-sm mt-6 border border-gray-300 rounded p-6">
        <h1 className="text-2xl font-medium mb-4">Sign in</h1>

        {error && <Message type="error">{error}</Message>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2 rounded text-sm transition"
          >
            {loading ? <Loader /> : 'Sign In'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4 leading-relaxed">
          By continuing, you agree to Amazon Clone's{' '}
          <span className="text-blue-600 cursor-pointer">Conditions of Use</span> and{' '}
          <span className="text-blue-600 cursor-pointer">Privacy Notice</span>.
        </p>
      </div>

      <div className="w-full max-w-sm mt-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 border-t border-gray-300" />
          <span className="text-xs text-gray-500">New to Amazon Clone?</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>
        <Link to={`/register?redirect=${redirect}`}>
          <button className="w-full border border-gray-400 rounded py-2 text-sm hover:bg-gray-100 transition">
            Create your Amazon Clone account
          </button>
        </Link>
      </div>
    </div>
  );
}
