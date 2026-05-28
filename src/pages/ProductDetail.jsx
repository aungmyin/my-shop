import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await api.getProduct(slug)
        setProduct(data.data || data)
        setError(null)
      } catch (err) {
        console.error('Failed to load product:', err)
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 text-center">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{error || 'Product not found'}</h2>
        <Link to="/" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
          ← Back to Products
        </Link>
      </div>
    )
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
      <Link to="/" className="text-purple-600 hover:text-purple-700 mb-8 inline-block">
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image || `https://picsum.photos/600/600?random=${product.id}`}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <span className="inline-block text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded mb-4">
            {product.category?.name || product.category || 'Other'}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="text-gray-600 text-sm mb-2">Price</p>
            <p className="text-5xl font-bold text-purple-600">${parseFloat(product.price).toFixed(2)}</p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span className="text-gray-700">In stock ({product.stock || 'N/A'} available)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span className="text-gray-700">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span className="text-gray-700">30-day money back guarantee</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}
