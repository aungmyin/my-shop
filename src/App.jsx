import { useState } from 'react'
import './App.css'

const sampleProducts = [
  { id: 1, name: 'Premium Headphones', price: 199.99, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 49.99, category: 'Accessories' },
  { id: 3, name: 'USB-C Cable', price: 15.99, category: 'Cables' },
  { id: 4, name: 'Laptop Stand', price: 79.99, category: 'Accessories' },
  { id: 5, name: 'Monitor Light', price: 59.99, category: 'Lighting' },
  { id: 6, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics' },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-600">My Shop</h1>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#products" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            </nav>
            <button className="relative px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              Cart <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to My Shop</h2>
          <p className="text-xl text-purple-100">Discover premium products at great prices</p>
        </div>
      </section>

      {/* Products Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <h3 id="products" className="text-3xl font-bold mb-8 text-gray-900">Featured Products</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-400 text-4xl">📦</span>
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 My Shop. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
