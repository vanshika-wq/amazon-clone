import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-amazon-dark text-white mt-auto">
      <div className="bg-amazon-light-blue py-3 text-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-white text-sm w-full hover:text-amazon-yellow"
        >
          Back to top
        </button>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-8 text-sm">
        <div>
          <h3 className="font-bold mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">About Us</Link></li>
            <li><Link to="/" className="hover:text-white">Careers</Link></li>
            <li><Link to="/" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Sell on Amazon</Link></li>
            <li><Link to="/" className="hover:text-white">Become an Affiliate</Link></li>
            <li><Link to="/" className="hover:text-white">Advertise</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Your Account</Link></li>
            <li><Link to="/" className="hover:text-white">Your Orders</Link></li>
            <li><Link to="/" className="hover:text-white">Shipping Rates</Link></li>
            <li><Link to="/" className="hover:text-white">Returns & Replacements</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Amazon Clone</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Amazon.com</Link></li>
            <li><Link to="/" className="hover:text-white">Amazon Prime</Link></li>
            <li><Link to="/" className="hover:text-white">Amazon Music</Link></li>
          </ul>
        </div>
      </div>
      <div className="bg-amazon-dark border-t border-gray-700 py-4 text-center text-gray-400 text-xs">
        <p>© 2024 Amazon Clone. Built with React + Node.js + MongoDB</p>
      </div>
    </footer>
  );
}
