import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import API from '../utils/api';

const BANNER_SLIDES = [
  { bg: 'from-blue-900 to-blue-700', title: 'Big Deals on Electronics', sub: 'Up to 40% off top brands', emoji: '💻' },
  { bg: 'from-orange-800 to-yellow-600', title: 'Gaming Week', sub: 'Consoles, games & accessories', emoji: '🎮' },
  { bg: 'from-green-900 to-green-600', title: 'Fashion Forward', sub: 'New season, new looks', emoji: '👟' },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slide, setSlide] = useState(0);
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/api/products?keyword=${keyword}`);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % BANNER_SLIDES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      {!keyword && (
        <div className={`relative bg-gradient-to-r ${BANNER_SLIDES[slide].bg} text-white overflow-hidden`} style={{ minHeight: 220 }}>
          <div className="max-w-6xl mx-auto px-8 py-14 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{BANNER_SLIDES[slide].title}</h1>
              <p className="text-lg text-white/80">{BANNER_SLIDES[slide].sub}</p>
              <button className="mt-4 bg-amazon-yellow text-black font-bold px-6 py-2 rounded-full hover:bg-amazon-yellow-hover transition">
                Shop Now
              </button>
            </div>
            <div className="text-8xl hidden md:block">{BANNER_SLIDES[slide].emoji}</div>
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {BANNER_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={`w-2 h-2 rounded-full transition-all ${i === slide ? 'bg-white w-4' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {keyword && (
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Search results for: <span className="text-blue-600">"{keyword}"</span>
          </h2>
        )}
        {!keyword && <h2 className="text-xl font-bold mb-4 text-gray-800">Best Sellers</h2>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : products.length === 0 ? (
          <Message type="info">No products found for "{keyword}"</Message>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
