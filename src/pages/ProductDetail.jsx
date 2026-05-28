import { useParams, Link } from 'react-router-dom'

const sampleProducts = [
  { id: 1, name: 'Premium Headphones', price: 199.99, category: 'Electronics', image: 'https://picsum.photos/400/400?random=1', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.' },
  { id: 2, name: 'Wireless Mouse', price: 49.99, category: 'Accessories', image: 'https://picsum.photos/400/400?random=2', description: 'Ergonomic wireless mouse with precision tracking and 2-year battery life.' },
  { id: 3, name: 'USB-C Cable', price: 15.99, category: 'Cables', image: 'https://picsum.photos/400/400?random=3', description: 'Durable USB-C cable with 100W fast charging capability.' },
  { id: 4, name: 'Laptop Stand', price: 79.99, category: 'Accessories', image: 'https://picsum.photos/400/400?random=4', description: 'Adjustable aluminum laptop stand for better ergonomics.' },
  { id: 5, name: 'Monitor Light', price: 59.99, category: 'Lighting', image: 'https://picsum.photos/400/400?random=5', description: 'Auto-dimming monitor light bar that reduces eye strain.' },
  { id: 6, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://picsum.photos/400/400?random=6', description: 'RGB mechanical keyboard with customizable switches.' },
]

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const product = sampleProducts.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
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
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>

        <div>
          <span className="inline-block text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded mb-4">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <p className="text-gray-600 text-sm mb-2">Price</p>
            <p className="text-5xl font-bold text-purple-600">${product.price}</p>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">✓</span>
              <span className="text-gray-700">In stock</span>
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
