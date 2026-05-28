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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 flex items-center gap-4 border-b border-gray-200">
                <input type="checkbox" className="w-5 h-5" />
                <span className="font-semibold text-gray-900 flex-1">Product</span>
                <span className="font-semibold text-gray-900 w-20 text-center">Price</span>
                <span className="font-semibold text-gray-900 w-20 text-center">Qty</span>
                <span className="font-semibold text-gray-900 w-24 text-right">Subtotal</span>
              </div>

              {/* Items */}
              {cartItems.map((item, index) => (
                <div key={index} className="px-6 py-4 border-b border-gray-200 flex items-center gap-4 hover:bg-gray-50 transition">
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                  <img
                    src={item.image || `https://picsum.photos/80/80?random=${item.id}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded bg-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category?.name || 'Product'}</p>
                  </div>
                  <span className="w-20 text-center font-semibold text-orange-600">
                    ฿{parseFloat(item.price).toFixed(2)}
                  </span>
                  <span className="w-20 text-center">1</span>
                  <span className="w-24 text-right font-semibold text-gray-900">
                    ฿{parseFloat(item.price).toFixed(2)}
                  </span>
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 transition font-medium">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>฿{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span>฿{shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (7%)</span>
                  <span>฿{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center bg-orange-50 p-4 rounded-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">฿{total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 ? (
                <p className="text-sm text-green-600 mb-4 text-center">✓ Free shipping qualified</p>
              ) : (
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Add ฿{(200 - subtotal).toFixed(2)} for free shipping
                </p>
              )}

              <button className="w-full px-6 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-bold text-lg mb-3">
                Checkout ({cartItems.length})
              </button>

              <div className="text-xs text-gray-600 space-y-2">
                <p>💳 Payment options: Credit Card, E-Wallet, COD</p>
                <p>📦 Delivery in 1-3 days</p>
                <p>↩️ 30-day returns guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
