import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems([...cartItems, product])
  }

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition">
            my-shop
          </Link>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex gap-8">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Shop</Link>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">About</a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Contact</a>
            </nav>
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h-3.5m3.5 0c0 1.1-.9 2-2 2s-2-.9-2-2" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
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
      <footer className="border-t border-gray-200 bg-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">my-shop</h3>
              <p className="text-sm text-gray-600">Premium products at great prices.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">All Products</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 transition">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900 transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 my-shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
