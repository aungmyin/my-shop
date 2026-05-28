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
    <div className="bg-gray-100 min-h-screen">
      {/* Main Promotional Banner */}
      <div className="w-full bg-white py-8">
        <div className="w-full px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
            {/* Large Banner */}
            <div className="md:col-span-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg p-12 h-64 flex flex-col justify-center shadow-md">
              <div className="text-white">
                <p className="text-lg font-bold mb-2">🔥 PAYDAY DEALS</p>
                <h2 className="text-4xl font-bold mb-3">UP TO 30% OFF</h2>
                <p className="text-red-100">Limited time offers</p>
              </div>
            </div>

            {/* Side Banners */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 h-28 flex items-center justify-center shadow-md">
                <div className="text-center text-white">
                  <p className="text-2xl font-bold">SUMMER</p>
                  <p className="text-sm">SALE</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg p-6 h-28 flex items-center justify-center shadow-md">
                <div className="text-center text-white">
                  <p className="text-2xl font-bold">₿2000</p>
                  <p className="text-xs">Voucher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Badges */}
      <div className="w-full bg-white py-6 border-b border-gray-200">
        <div className="w-full px-4 lg:px-8">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {[
              { icon: '🚚', label: 'Free Shipping' },
              { icon: '✓', label: 'Fulfilled' },
              { icon: '🏪', label: 'Shopee Newly' },
              { icon: '🏬', label: 'Shopee Mall' },
              { icon: '👗', label: 'Fashion' },
              { icon: '💰', label: 'Cheap 99' },
              { icon: '🛒', label: 'Supermarket' },
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center gap-2 hover:opacity-80 transition cursor-pointer">
                <span className="text-3xl">{service.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center whitespace-nowrap">{service.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Promo */}
      <div className="w-full bg-white py-6">
        <div className="w-full px-4 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-xl p-8 shadow-lg flex items-center justify-between">
            <div className="text-white">
              <p className="text-sm font-bold">✨ SPECIAL OFFER</p>
              <h3 className="text-3xl font-bold">50% OFF FIRST ORDER</h3>
            </div>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:shadow-lg transition whitespace-nowrap">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full bg-white py-8 border-b border-gray-200">
        <div className="w-full px-4 lg:px-8">
          <p className="text-xs uppercase font-bold text-gray-600 mb-6">Browse by Category</p>
          <div className="flex flex-wrap gap-6 justify-start">
            {[
              { icon: '📱', name: 'Electronics' },
              { icon: '⌚', name: 'Accessories' },
              { icon: '🎮', name: 'Gadgets' },
              { icon: '🎧', name: 'Audio' },
              { icon: '💡', name: 'Lighting' },
              { icon: '⌨️', name: 'Keyboards' },
            ].map((cat, i) => (
              <button key={cat.name} className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-xs font-medium text-gray-800 text-center">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-full py-12">
        <div className="w-full px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended For You</h2>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <p className="text-gray-600 mt-4">Loading...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              {error}
            </div>
          )}

          {!loading && products.length === 0 && (
            <p className="text-center text-gray-600">No products found</p>
          )}

          {!loading && products.length > 0 && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 auto-rows-max">
                {products.map(product => (
                  <Link
                    key={product.slug}
                    to={`/product/${product.slug}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group"
                  >
                    {/* Image */}
                    <div className="relative w-full h-40 sm:h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={product.image || `https://picsum.photos/300/300?random=${product.id}`}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -20%
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-2">
                      <h4 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                        {product.name}
                      </h4>

                      <p className="text-sm font-bold text-orange-600 mb-1">
                        ฿{parseFloat(product.price).toFixed(2)}
                      </p>

                      <p className="text-xs text-gray-600 mb-2">⭐ 4.9</p>

                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onAddToCart(product)
                        }}
                        className="w-full py-1 bg-orange-50 text-orange-600 border border-orange-200 rounded text-xs font-semibold hover:bg-orange-100 transition"
                      >
                        Add
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <button className="px-12 py-3 border-2 border-orange-600 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition">
                  Load More
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
