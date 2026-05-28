import { Link } from 'react-router-dom'

const sampleProducts = [
  { id: 1, name: 'Premium Headphones', price: 199.99, category: 'Electronics', image: 'https://picsum.photos/400/400?random=1' },
  { id: 2, name: 'Wireless Mouse', price: 49.99, category: 'Accessories', image: 'https://picsum.photos/400/400?random=2' },
  { id: 3, name: 'USB-C Cable', price: 15.99, category: 'Cables', image: 'https://picsum.photos/400/400?random=3' },
  { id: 4, name: 'Laptop Stand', price: 79.99, category: 'Accessories', image: 'https://picsum.photos/400/400?random=4' },
  { id: 5, name: 'Monitor Light', price: 59.99, category: 'Lighting', image: 'https://picsum.photos/400/400?random=5' },
  { id: 6, name: 'Mechanical Keyboard', price: 129.99, category: 'Electronics', image: 'https://picsum.photos/400/400?random=6' },
]

export default function Home({ onAddToCart }) {
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sampleProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <span className="inline-block text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded mb-2">
                  {product.category}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
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
