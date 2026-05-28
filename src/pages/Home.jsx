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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to My Shop</h2>
          <p className="text-xl text-purple-100">Discover premium products at great prices</p>
        </div>
      </section>

      {/* Products Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 text-gray-900">Featured Products</h3>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found.</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <img
                src={product.image || `https://picsum.photos/400/400?random=${product.id}`}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded mb-2">
                  {product.category?.name || product.category || 'Other'}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">${parseFloat(product.price).toFixed(2)}</span>
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.slug}`}
                      className="px-3 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
