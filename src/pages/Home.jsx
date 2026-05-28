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
      {/* Flash Sale Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
        <div className="w-full px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl animate-bounce">🔥</span>
              <div>
                <h2 className="text-2xl font-bold">Flash Sale</h2>
                <p className="text-sm text-orange-100">Up to 50% off</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm">Ends in</p>
              <p className="text-2xl font-bold">00:23:45</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        {/* Category Carousel */}
        <div className="w-full border-b border-gray-200">
          <div className="w-full px-4 lg:px-8 py-4">
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { icon: '🏠', name: 'Home' },
                { icon: '⚡', name: 'Flash Sale' },
                { icon: '🎁', name: 'Deals' },
                { icon: '💎', name: 'Premium' },
                { icon: '📱', name: 'Electronics' },
                { icon: '⌚', name: 'Accessories' },
                { icon: '🎮', name: 'Gadgets' },
              ].map((cat, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center gap-2 px-3 py-2 hover:text-orange-600 transition whitespace-nowrap flex-shrink-0"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full px-4 lg:px-8 py-12">
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
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
              <p className="text-gray-600 text-xl">No products available.</p>
            </div>
          )}

          {!loading && products.length > 0 && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recommended For You</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map(product => (
                  <Link
                    key={product.slug}
                    to={`/product/${product.slug}`}
                    className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={product.image || `https://picsum.photos/400/400?random=${product.id}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -20%
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      {/* Name */}
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600">
                        {product.name}
                      </h4>

                      {/* Price */}
                      <div className="mb-2">
                        <p className="text-lg font-bold text-orange-600">
                          ฿{parseFloat(product.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 line-through">
                          ฿{(parseFloat(product.price) * 1.25).toFixed(2)}
                        </p>
                      </div>

                      {/* Rating & Sold */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                        <span>⭐ 4.9</span>
                        <span>•</span>
                        <span>Sold 2.5k</span>
                      </div>

                      {/* Shop Info */}
                      <div className="text-xs text-gray-600 mb-3 pb-3 border-t border-gray-100 pt-2">
                        Official Store
                      </div>

                      {/* Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onAddToCart(product)
                        }}
                        className="w-full py-2 bg-orange-50 text-orange-600 rounded hover:bg-orange-100 transition text-xs font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
