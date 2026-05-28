import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState(false)

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

  const handleAddToCart = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-12">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </Link>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h2>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-12">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden sticky top-24">
            <img
              src={product.image || `https://picsum.photos/600/600?random=${product.id}`}
              alt={product.name}
              className="w-full h-auto aspect-square object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="mb-6">
            <span className="inline-block text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-4">
              {product.category?.name || 'Product'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-gray-600 text-sm font-medium mb-2">Price</p>
            <p className="text-5xl font-bold text-gray-900">
              ${parseFloat(product.price).toFixed(2)}
            </p>
          </div>

          {/* Stock & Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">In Stock</p>
                <p className="text-sm text-gray-600">{product.stock || 'N/A'} available</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Free Shipping</p>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">30-Day Returns</p>
                <p className="text-sm text-gray-600">Money-back guarantee</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                added
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <Link
              to="/"
              className="block text-center px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
