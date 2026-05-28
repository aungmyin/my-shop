import { Link } from 'react-router-dom'

export default function Cart({ cartItems, onRemoveFromCart }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const shipping = subtotal > 200 ? 0 : 50
  const tax = Math.round(subtotal * 0.07 * 100) / 100
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-600 text-xl mb-8">Your cart is empty</p>
            <Link to="/" className="inline-block px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <input type="checkbox" className="w-5 h-5 mt-2 flex-shrink-0" defaultChecked />

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || `https://picsum.photos/120/120?random=${item.id}`}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg bg-gray-100"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.category?.name || 'Product'}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-orange-600">
                        ฿{parseFloat(item.price).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ฿{(parseFloat(item.price) * 1.25).toFixed(2)}
                      </span>
                    </div>

                    {/* Stock Info */}
                    <p className="text-xs text-gray-500">In Stock: {item.stock || 'N/A'} available</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="flex-shrink-0 text-gray-400 hover:text-red-600 transition pt-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition font-medium mt-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">฿{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-semibold text-green-600">Free</span>
                  ) : (
                    <span className="font-semibold text-gray-900">฿{shipping.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7%)</span>
                  <span className="font-semibold text-gray-900">฿{tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-3xl font-bold text-orange-600">฿{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Info */}
              {shipping === 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-green-700 font-medium">✓ Free shipping qualified!</p>
                </div>
              ) : (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-orange-700">
                    Add ฿{(200 - subtotal).toFixed(2)} for <span className="font-semibold">free shipping</span>
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <button className="w-full px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-bold text-lg mb-4">
                Checkout ({cartItems.length})
              </button>

              {/* Additional Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">💳</span>
                  <div>
                    <p className="font-medium text-gray-900">Flexible Payment</p>
                    <p className="text-xs text-gray-600">Credit Card, E-Wallet, COD</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg">📦</span>
                  <div>
                    <p className="font-medium text-gray-900">Fast Delivery</p>
                    <p className="text-xs text-gray-600">1-3 days delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-lg">↩️</span>
                  <div>
                    <p className="font-medium text-gray-900">Hassle-free Returns</p>
                    <p className="text-xs text-gray-600">30-day money back</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
