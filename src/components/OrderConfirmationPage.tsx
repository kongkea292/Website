import type { OrderRecord } from "../types/store";

interface OrderConfirmationPageProps {
  order: OrderRecord;
  onStartNewOrder: () => void;
}

export default function OrderConfirmationPage({
  order,
  onStartNewOrder,
}: OrderConfirmationPageProps) {
  const fullName = `${order.customer.firstName} ${order.customer.lastName}`.trim();

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-sm">
        <p className="text-lg font-bold text-emerald-700">
          Order Placed Successfully!
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 border-y border-slate-200 py-4 text-sm sm:grid-cols-2">
          <div>
            <span className="text-slate-500">Order ID: </span>
            <strong className="text-slate-900">{order.orderId}</strong>
          </div>
          <div>
            <span className="text-slate-500">Order Status: </span>
            <strong className="text-amber-700">{order.status}</strong>
          </div>
          <div>
            <span className="text-slate-500">Customer Name: </span>
            <strong className="text-slate-900">{fullName}</strong>
          </div>
          <div>
            <span className="text-slate-500">Order Date: </span>
            <strong className="text-slate-900">{order.orderDate}</strong>
          </div>
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-900">
          Ordered Products
        </h3>
        <ul className="mt-2 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={item.product.id} className="flex justify-between text-slate-700">
              <span>
                {item.product.name} (x{item.quantity})
              </span>
              <span className="font-semibold text-slate-900">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
          <span>Total Amount</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Back to Products
        </button>
      </div>
    </section>
  );
}