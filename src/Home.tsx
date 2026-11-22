import { useState } from "react";
import { PRODUCTS, type Product } from "./data/products";
import type { CartItem, CustomerInfo, OrderRecord } from "./types/store";
import FourProducts from "./components/FourProducts";
import ShoppingCartPage from "./components/ShoppingCartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";

type PageView = "products" | "cart" | "checkout" | "confirmation";

export default function Home() {
  const [page, setPage] = useState<PageView>("products");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [latestOrder, setLatestOrder] = useState<OrderRecord | null>(null);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function handleAddToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function handleUpdateQty(productId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveItem(productId: number) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function handlePlaceOrder(
    customer: CustomerInfo,
    shippingCost: number,
    grandTotal: number
  ) {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const newOrder: OrderRecord = {
      orderId: "ORD-0001",
      orderDate: new Date().toLocaleDateString(),
      customer,
      items: cart,
      subtotal,
      shippingCost,
      totalAmount: grandTotal,
      status: "Pending",
    };

    setLatestOrder(newOrder);
    setCart([]);
    setPage("confirmation");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button
            type="button"
            onClick={() => setPage("products")}
            className="text-lg font-bold text-slate-900"
          >
            Kongkea Store
          </button>

          <nav className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setPage("products")}
              className="rounded-lg px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-100"
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => setPage("cart")}
              className="rounded-lg bg-slate-900 px-3.5 py-1.5 font-semibold text-white hover:bg-slate-800"
            >
              View Cart ({totalCartItems})
            </button>
          </nav>
        </div>
      </header>

      <main>
        {page === "products" && (
          <FourProducts products={PRODUCTS} onAddToCart={handleAddToCart} />
        )}

        {page === "cart" && (
          <ShoppingCartPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => setPage("checkout")}
            onBackToProducts={() => setPage("products")}
          />
        )}

        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => setPage("cart")}
          />
        )}

        {page === "confirmation" && latestOrder && (
          <OrderConfirmationPage
            order={latestOrder}
            onStartNewOrder={() => setPage("products")}
          />
        )}
      </main>
    </div>
  );
}