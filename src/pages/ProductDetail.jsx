import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
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
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <main className="flex-1 w-full px-4 lg:px-8 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="flex-1 w-full px-4 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition font-medium">
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
    <main className="flex-1 bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg p-6">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg">
            <img
              src={product.image || `https://picsum.photos/600/600?random=${product.id}`}
              alt={product.name}
              className="w-full h-auto max-h-96 object-contain"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900 mr-2">4.9</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                <span className="font-semibold">2.5k</span> ratings | <span className="font-semibold">8.2k</span> sold
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="bg-orange-50 p-6 rounded-lg">
                <p className="text-gray-600 text-sm mb-2">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-orange-600">
                    ฿{parseFloat(product.price).toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ฿{(parseFloat(product.price) * 1.25).toFixed(2)}
                  </span>
                  <span className="text-lg font-bold text-orange-600 bg-orange-200 px-3 py-1 rounded">-20%</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">About this item</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-l border-r border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ {product.stock || 'N/A'} items available</p>
                <p>✓ Free Shipping on orders over ฿200</p>
                <p>✓ 30-day money back guarantee</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-6 py-4 rounded-lg font-bold text-lg transition-all ${
                    added
                      ? 'bg-gray-900 text-white'
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {added ? '✓ Added' : `Add to Cart (${quantity})`}
                </button>
                <button className="flex-1 px-6 py-4 border-2 border-orange-600 text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition">
                  ♡ Save
                </button>
              </div>

              <button className="w-full px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                Message Seller
              </button>
            </div>

            {/* Seller Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 font-semibold mb-2">Official Store</p>
                <p className="text-sm text-gray-600">⭐ 4.8 (15.2k reviews)</p>
                <p className="text-sm text-gray-600">📍 Bangkok</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
