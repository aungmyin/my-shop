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
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Discover Premium Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Curated collection of quality items for your lifestyle
          </p>
        </div>
      </section>

      {/* Products Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <div className="h-1 w-12 bg-gray-900"></div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
            <p className="text-gray-600 mt-4 text-lg">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 max-w-2xl">
            {error}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No products available at the moment.</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image || `https://picsum.photos/400/400?random=${product.id}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-block text-xs font-semibold text-gray-700 bg-white px-3 py-1 rounded-full">
                        {product.category?.name || 'Product'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Footer */}
                    <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          onAddToCart(product)
                        }}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
