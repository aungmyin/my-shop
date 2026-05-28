import { Link } from 'react-router-dom'

export default function Cart({ cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  if (cartItems.length === 0) {
    return (
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
        <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
        <Link to="/" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
          Continue Shopping
        </Link>
      </main>
    )
  }

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 p-6 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                  <p className="text-purple-600 font-semibold text-lg mt-2">${item.price}</p>
                </div>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  className="text-red-600 hover:text-red-700 font-semibold self-start"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(total * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-purple-600">${(total * 1.1).toFixed(2)}</span>
            </div>

            <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold mb-3">
              Proceed to Checkout
            </button>

            <Link to="/" className="w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-semibold text-center block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
