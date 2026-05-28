import { Link } from 'react-router-dom'

export default function Cart({ cartItems, onRemoveFromCart }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <div className="h-1 w-12 bg-gray-900 mb-12"></div>

        <div className="text-center py-20">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m0 0h-3.5m3.5 0c0 1.1-.9 2-2 2s-2-.9-2-2" />
          </svg>
          <p className="text-gray-600 text-xl mb-8">Your cart is empty</p>
          <Link to="/" className="inline-block px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-6 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
      <div className="h-1 w-12 bg-gray-900 mb-12"></div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={index} className="p-6 border-b border-gray-200 last:border-b-0 flex gap-6">
                <img
                  src={item.image || `https://picsum.photos/150/150?random=${item.id}`}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.category?.name || 'Product'}</p>
                  <p className="text-xl font-bold text-gray-900">${parseFloat(item.price).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  className="text-gray-400 hover:text-red-600 transition self-start"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <Link to="/" className="inline-block mt-8 text-gray-600 hover:text-gray-900 transition font-medium">
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 sticky top-24 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-semibold mb-3">
              Proceed to Checkout
            </button>

            <button className="w-full px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold">
              Continue Shopping
            </button>

            {/* Summary */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-semibold text-gray-900">{cartItems.length}</span> item{cartItems.length !== 1 ? 's' : ''} in cart
              </p>
              <p className="text-xs text-gray-600">
                Free shipping on orders over $50 ✓
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
