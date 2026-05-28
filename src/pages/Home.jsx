import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await api.getProducts()
        setProducts(data.data || data)
        setError(null)
      } catch (err) {
        console.error('Failed to load products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      {/* Promotional Banner */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🔥</span>
                <h2 className="text-4xl font-bold">Flash Sale Today!</h2>
              </div>
              <p className="text-orange-100 text-lg">Get up to 50% off on selected items</p>
            </div>
            <div className="hidden md:block text-6xl">⚡</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        {/* Categories Section - No Borders! */}
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
          <h3 className="text-sm font-bold text-gray-800 mb-6 tracking-wider">CATEGORIES</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: '📱', name: 'Electronics' },
              { icon: '⌚', name: 'Accessories' },
              { icon: '🎮', name: 'Gadgets' },
              { icon: '🎧', name: 'Audio' },
              { icon: '💡', name: 'Lighting' },
              { icon: '⌨️', name: 'Keyboards' },
            ].map((cat, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-orange-50 transition-all duration-300 group"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* For You Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">✨</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">For You</h2>
                <p className="text-sm text-gray-600">Popular items in your area</p>
              </div>
            </div>

            {loading && (
              <div className="text-center py-20">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
                <p className="text-gray-600 mt-4 text-lg">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                {error}
              </div>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-xl">No products available at the moment.</p>
              </div>
            )}

            {!loading && products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {products.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                      {/* Image Container */}
                      <div className="relative h-40 md:h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={product.image || `https://picsum.photos/400/400?random=${product.id}`}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Discount Badge */}
                        <div className="absolute top-2 right-2 bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm">
                          -20%
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-2 left-2 bg-white rounded-md px-2 py-1 flex items-center gap-1">
                          <span>⭐</span>
                          <span className="text-xs font-bold text-gray-900">4.9</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        {/* Price */}
                        <div className="mb-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base md:text-lg font-bold text-orange-600">
                              ฿{parseFloat(product.price).toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              ฿{(parseFloat(product.price) * 1.25).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Name */}
                        <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>

                        {/* Sold Count */}
                        <p className="text-xs text-gray-500 mb-3">
                          Sold {Math.floor(Math.random() * 1000)}
                        </p>

                        {/* Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            onAddToCart(product)
                          }}
                          className="w-full px-2 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-semibold"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Browse More Button */}
          <div className="text-center py-12">
            <button className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-all font-bold text-lg">
              Browse More Products
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
