import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) navigate(`/?keyword=${searchTerm}`);
    else navigate('/');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-amazon-dark text-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-2 gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center border border-transparent hover:border-white p-1 rounded flex-shrink-0">
          <span className="text-white font-bold text-2xl tracking-tight">amazon</span>
          <span className="text-amazon-yellow font-bold text-2xl">.clone</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
          <select className="bg-gray-200 text-black text-sm px-2 rounded-l-md border-r border-gray-400 focus:outline-none hidden md:block">
            <option>All</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Gaming</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon Clone..."
            className="flex-1 px-3 py-2 text-black focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-amazon-yellow hover:bg-amazon-yellow-hover px-4 rounded-r-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Account */}
        <div className="relative flex-shrink-0" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
          <button className="border border-transparent hover:border-white p-1 rounded text-left">
            <p className="text-xs text-gray-300">Hello, {userInfo ? userInfo.name : 'Sign in'}</p>
            <p className="text-sm font-bold">Account & Lists ▾</p>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-full bg-white text-black shadow-xl w-48 z-50 rounded">
              {!userInfo ? (
                <div className="p-4 text-center">
                  <Link to="/login" className="block bg-amazon-yellow hover:bg-amazon-yellow-hover text-black text-sm font-bold py-1.5 px-4 rounded mb-2">
                    Sign In
                  </Link>
                  <p className="text-xs">New customer? <Link to="/register" className="text-blue-600">Start here</Link></p>
                </div>
              ) : (
                <div className="py-2">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">My Account</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Sign Out</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <Link to="/profile" className="border border-transparent hover:border-white p-1 rounded flex-shrink-0 hidden md:block">
          <p className="text-xs text-gray-300">Returns</p>
          <p className="text-sm font-bold">& Orders</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-end border border-transparent hover:border-white p-1 rounded flex-shrink-0">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amazon-yellow text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-sm font-bold ml-1 hidden md:block">Cart</span>
        </Link>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bg-amazon-blue text-white text-sm flex items-center px-4 py-1 gap-4">
        <Link to="/" className="hover:text-amazon-yellow flex items-center gap-1 py-1 px-2 hover:outline hover:outline-white rounded text-sm">
          ☰ All
        </Link>
        <Link to="/?keyword=" className="hover:text-amazon-yellow py-1 px-2 hover:outline hover:outline-white rounded text-sm hidden md:block">Today's Deals</Link>
        <Link to="/?keyword=Electronics" className="hover:text-amazon-yellow py-1 px-2 hover:outline hover:outline-white rounded text-sm hidden md:block">Electronics</Link>
        <Link to="/?keyword=Gaming" className="hover:text-amazon-yellow py-1 px-2 hover:outline hover:outline-white rounded text-sm hidden md:block">Gaming</Link>
        <Link to="/?keyword=Clothing" className="hover:text-amazon-yellow py-1 px-2 hover:outline hover:outline-white rounded text-sm hidden md:block">Fashion</Link>
        <span className="text-amazon-yellow font-bold text-sm ml-auto hidden md:block">Free delivery on orders over $25</span>
      </div>
    </header>
  );
}
