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
      {/* Promotional Banners */}
      <section className="w-full bg-gray-100">
        <div className="w-full px-4 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Large Banner 1 */}
            <div className="md:col-span-2 bg-gradient-to-r from-red-600 to-red-500 rounded-lg overflow-hidden h-48 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm font-bold">PAYDAY</p>
                <h2 className="text-3xl font-bold">DISCOUNT UP TO 30%</h2>
                <p className="text-sm mt-2">On selected items</p>
              </div>
            </div>

            {/* Banner 2 */}
            <div className="bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg overflow-hidden h-48 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-2xl font-bold">SUMMER</p>
                <p className="text-sm">SALE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Icons */}
      <section className="w-full bg-white border-b border-gray-200">
        <div className="w-full px-4 lg:px-8 py-6">
          <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
            {[
              { icon: '🚚', label: 'Free Shipping' },
              { icon: '✓', label: 'Fulfilled' },
              { icon: '🏪', label: 'Shopee Newly' },
              { icon: '🏬', label: 'Shopee Mall' },
              { icon: '👗', label: 'Fashion' },
              { icon: '💰', label: 'Cheap 99' },
              { icon: '🛒', label: 'Supermarket' },
            ].map((service, i) => (
              <button key={i} className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition">
                <span className="text-3xl">{service.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center">{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Big Promo Banner */}
      <section className="w-full bg-white px-4 lg:px-8 py-6">
        <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-8 text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-bold">✨ New Customer Special</p>
            <h2 className="text-2xl font-bold">GET UP TO 50% OFF</h2>
            <p className="text-sm text-orange-100">On your first purchase</p>
          </div>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full bg-white border-b border-gray-200 px-4 lg:px-8 py-8">
        <h3 className="text-sm font-bold text-gray-700 mb-6 uppercase">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: '📱', name: 'Electronics' },
            { icon: '⌚', name: 'Accessories' },
            { icon: '🎮', name: 'Gadgets' },
            { icon: '🎧', name: 'Audio' },
            { icon: '💡', name: 'Lighting' },
            { icon: '⌨️', name: 'Keyboards' },
          ].map((cat, i) => (
            <button key={cat.name} className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 rounded-lg transition">
              <span className="text-4xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-800 text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-gray-50 px-4 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Recommended For You</h2>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map(product => (
              <Link
                key={product.slug}
                to={`/product/${product.slug}`}
                className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image */}
                <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
                  <img
                    src={product.image || `https://picsum.photos/300/300?random=${product.id}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Discount */}
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -20%
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  {/* Name */}
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 h-9">
                    {product.name}
                  </h4>

                  {/* Price */}
                  <div className="mb-2">
                    <p className="text-base font-bold text-orange-600">
                      ฿{parseFloat(product.price).toFixed(2)}
                    </p>
                  </div>

                  {/* Rating & Sold */}
                  <div className="text-xs text-gray-600 mb-3 space-y-1">
                    <p>⭐ 4.9 (2.5k)</p>
                    <p>Sold 1.2k</p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      onAddToCart(product)
                    }}
                    className="w-full py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded hover:bg-orange-100 transition text-xs font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition font-bold">
              Load More Products
            </button>
          </div>
        )}
      </section>
    </>
  )
}
