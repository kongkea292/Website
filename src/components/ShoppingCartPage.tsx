import type { CartItem } from "../types/store";

interface ShoppingCartPageProps {
  cart: CartItem[];
  onUpdateQty: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceedToCheckout: () => void;
  onBackToProducts: () => void;
}

export default function ShoppingCartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onBackToProducts,
}: ShoppingCartPageProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const grandTotal = subtotal;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Shopping Cart</h2>
        <button
          type="button"
          onClick={onBackToProducts}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.product.id, -1)}
                    className="h-8 w-8 rounded border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    aria-label={`Decrease quantity of ${item.product.name}`}
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(item.product.id, 1)}
                    className="h-8 w-8 rounded border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                    aria-label={`Increase quantity of ${item.product.name}`}
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="mt-1 text-xs font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}