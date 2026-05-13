import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingPage() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  if (!userInfo) { navigate('/login'); return null; }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <CheckoutSteps step1 step2 />
      <div className="bg-white border rounded p-6">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Address', value: address, set: setAddress, placeholder: '123 Main Street' },
            { label: 'City', value: city, set: setCity, placeholder: 'New York' },
            { label: 'Postal Code', value: postalCode, set: setPostalCode, placeholder: '10001' },
            { label: 'Country', value: country, set: setCountry, placeholder: 'United States' },
          ].map(({ label, value, set, placeholder }) => (
            <div key={label}>
              <label className="block text-sm font-bold mb-1">{label}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                required
                placeholder={placeholder}
                className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2 rounded text-sm mt-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
