import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden h-48 flex items-center justify-center p-4 bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} numReviews={product.numReviews} />
        <div className="mt-2">
          <span className="text-xs text-gray-500">$</span>
          <span className="text-xl font-bold text-gray-900">{Math.floor(product.price)}</span>
          <span className="text-sm text-gray-500">{(product.price % 1).toFixed(2).slice(1)}</span>
        </div>
        {product.countInStock === 0 && (
          <p className="text-red-500 text-xs mt-1">Out of Stock</p>
        )}
        <Link
          to={`/product/${product._id}`}
          className="mt-2 block text-center bg-amazon-yellow hover:bg-amazon-yellow-hover text-black text-sm font-medium py-1.5 px-3 rounded-full transition-colors"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
}
