import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/userSlice';
import Message from '../components/Message';
import API from '../utils/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => { if (userInfo) navigate('/'); }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await API.post('/api/users/register', { name, email, password });
      dispatch(setCredentials(data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
        <h1 className="text-2xl font-medium mb-4">Create account</h1>
        {error && <Message type="error">{error}</Message>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {[
            { label: 'Your name', value: name, set: setName, type: 'text', placeholder: 'First and last name' },
            { label: 'Email', value: email, set: setEmail, type: 'email', placeholder: 'Enter email' },
            { label: 'Password', value: password, set: setPassword, type: 'password', placeholder: 'At least 6 characters' },
            { label: 'Re-enter password', value: confirm, set: setConfirm, type: 'password', placeholder: 'Confirm password' },
          ].map(({ label, value, set, type, placeholder }) => (
            <div key={label}>
              <label className="block text-sm font-bold mb-1">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                required
                placeholder={placeholder}
                className="w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2 rounded text-sm"
          >
            {loading ? 'Creating account...' : 'Create your Amazon Clone account'}
          </button>
        </form>
      </div>

      <p className="text-sm mt-4 text-gray-700">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
