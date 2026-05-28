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
      {/* Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Flash Sale Today</h2>
              <p className="text-orange-100">Get up to 50% off on selected items!</p>
            </div>
            <div className="hidden md:block">
              <div className="text-4xl font-bold">🔥</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-4">CATEGORIES</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: '📱', name: 'Electronics' },
              { icon: '⌚', name: 'Accessories' },
              { icon: '🎮', name: 'Gadgets' },
              { icon: '🎧', name: 'Audio' },
              { icon: '💡', name: 'Lighting' },
              { icon: '⌨️', name: 'Keyboards' },
            ].map((cat, i) => (
              <button key={i} className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-lg transition">
                <div className="text-3xl">{cat.icon}</div>
                <span className="text-xs font-medium text-gray-600 text-center">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Section Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">✨</span>
              <h2 className="text-2xl font-bold text-gray-900">For You</h2>
            </div>
            <p className="text-gray-600 text-sm">Popular items in your area</p>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={product.image || `https://picsum.photos/400/400?random=${product.id}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Rating Badge */}
                      <div className="absolute top-2 right-2 bg-white rounded-md px-2 py-1 text-xs font-semibold text-orange-600 flex items-center gap-1">
                        <span>⭐</span> 4.9
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-3 flex flex-col flex-1">
                      {/* Price */}
                      <div className="mb-2">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-gray-900">
                            ฿{parseFloat(product.price).toFixed(2)}
                          </span>
                          <span className="text-xs text-orange-600 font-semibold">-20%</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-xs font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
                        {product.name}
                      </h3>

                      {/* Stats */}
                      <div className="text-xs text-gray-500 mb-3 flex-1">
                        <p>Sold {Math.floor(Math.random() * 1000)}</p>
                      </div>

                      {/* Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onAddToCart(product)
                        }}
                        className="w-full px-2 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors text-xs font-semibold"
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

        {/* Browse More */}
        <div className="text-center py-8">
          <button className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition font-semibold">
            Browse More
          </button>
        </div>
      </main>
    </>
  )
}
