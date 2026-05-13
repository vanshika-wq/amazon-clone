import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import API from '../utils/api';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/products/${id}`);
      setProduct(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate('/cart');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/api/products/${id}/reviews`, { rating: reviewRating, comment: reviewComment });
      setReviewSuccess('Review submitted!');
      setReviewComment('');
      fetchProduct();
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="max-w-4xl mx-auto p-4"><Message type="error">{error}</Message></div>;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline text-sm mb-4 flex items-center gap-1">
        ← Back to results
      </button>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Image */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-center" style={{ minHeight: 350 }}>
          <img src={product.image} alt={product.name} className="max-h-80 object-contain" />
        </div>

        {/* Details */}
        <div className="space-y-3">
          <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
          <div className="border-b pb-3">
            <Rating value={product.rating} numReviews={product.numReviews} />
          </div>
          <div className="border-b pb-3">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">Brand:</span> {product.brand}</p>
            <p><span className="font-medium">Category:</span> {product.category}</p>
          </div>
        </div>

        {/* Buy Box */}
        <div className="bg-white rounded shadow p-4 h-fit space-y-3 border">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm">
            <span className="font-medium">FREE delivery</span> <span className="text-blue-600">Thursday, Dec 28</span>
          </p>
          <p className={`font-medium text-sm ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.countInStock > 0 ? `In Stock (${product.countInStock} left)` : 'Out of Stock'}
          </p>

          {product.countInStock > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Qty:</label>
              <select
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                {[...Array(Math.min(product.countInStock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold py-2 rounded-full text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-full text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buy Now
          </button>
          <p className="text-xs text-gray-500 text-center">Ships from and sold by Amazon Clone</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-4">Customer Reviews</h2>
          {product.reviews.length === 0 ? (
            <Message type="info">No reviews yet. Be the first!</Message>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((r) => (
                <div key={r._id} className="bg-white p-4 rounded shadow-sm border-l-4 border-amazon-yellow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{r.name}</span>
                    <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Rating value={r.rating} />
                  <p className="text-sm text-gray-700 mt-1">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Write a Review</h2>
          {!userInfo ? (
            <Message type="info">Please <a href="/login" className="text-blue-600 underline">sign in</a> to write a review.</Message>
          ) : (
            <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded shadow space-y-3">
              {reviewSuccess && <Message type="success">{reviewSuccess}</Message>}
              {reviewError && <Message type="error">{reviewError}</Message>}
              <div>
                <label className="text-sm font-medium block mb-1">Rating</label>
                <select value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} className="border rounded px-3 py-1.5 w-full text-sm">
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Poor</option>
                  <option value={1}>⭐ Terrible</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  rows={3}
                  required
                  className="border rounded px-3 py-2 w-full text-sm resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button type="submit" className="bg-amazon-yellow hover:bg-amazon-yellow-hover text-black font-bold px-4 py-2 rounded text-sm">
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
