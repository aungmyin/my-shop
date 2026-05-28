import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="w-full px-4 lg:px-8 py-3 flex justify-between items-center text-xs">
          <div className="flex gap-6 text-gray-600">
            <a href="#" className="hover:text-orange-600 transition">Seller Centre</a>
            <a href="#" className="hover:text-orange-600 transition">Download</a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-orange-600 transition">Account</a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition">Help</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="w-full px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center gap-4 mb-4">
            <Link to="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition flex-shrink-0">
              my-shop
            </Link>

            {/* Search Bar */}
            <div className="flex-1 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center gap-2 px-4 py-3 hover:bg-gray-100 rounded-lg transition flex-shrink-0">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h-3.5m3.5 0c0 1.1-.9 2-2 2s-2-.9-2-2" />
              </svg>
              {cartItems.length > 0 && (
                <span className="bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Bar */}
        <div className="border-t border-gray-100 bg-white">
          <div className="w-full px-4 lg:px-8">
            <div className="flex gap-6 overflow-x-auto py-4 text-sm font-medium text-gray-600">
              <button className="flex flex-col items-center gap-2 hover:text-orange-600 transition whitespace-nowrap">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">🔥</div>
                Flash Sale
              </button>
              <button className="flex flex-col items-center gap-2 hover:text-orange-600 transition whitespace-nowrap">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">⭐</div>
                Best Seller
              </button>
              <button className="flex flex-col items-center gap-2 hover:text-orange-600 transition whitespace-nowrap">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">🎁</div>
                Special
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/product/:slug" element={<ProductDetail onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={removeFromCart} />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
        <div className="w-full px-4 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">About my-shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Care</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Start Selling</a></li>
                <li><a href="#" className="hover:text-white transition">Seller Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Policy</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Return Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Download App</h4>
              <p className="text-sm mb-4">Shop on the go</p>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-sm font-medium">
                  iOS
                </button>
                <button className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-sm font-medium">
                  Android
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-sm">&copy; 2026 my-shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
