import { useState, type FormEvent } from "react";
import type { CartItem, CustomerInfo, ShippingMethod } from "../types/store";

interface CheckoutPageProps {
  cart: CartItem[];
  onPlaceOrder: (customer: CustomerInfo, shippingCost: number, grandTotal: number) => void;
  onBackToCart: () => void;
}

export default function CheckoutPage({
  cart,
  onPlaceOrder,
  onBackToCart,
}: CheckoutPageProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("free");
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = shippingMethod === "express" ? 10 : 0;
  const grandTotal = subtotal + shippingCost;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      setErrorMsg("Please fill in all required fields (*).");
      return;
    }

    setErrorMsg("");
    onPlaceOrder(
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        shippingMethod,
      },
      shippingCost,
      grandTotal
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
        <button
          type="button"
          onClick={onBackToCart}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Cart
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900">Customer Details</h3>

          {errorMsg && (
            <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
              {errorMsg}
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                First Name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Daro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Last Name *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="Sok"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="daro@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                placeholder="012 345 678"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Address *
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Street 271, Phnom Penh"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Phnom Penh"
            />
          </div>

          <div className="pt-2">
            <h4 className="mb-2 text-sm font-semibold text-slate-900">
              Shipping Method
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-300 p-3 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "free"}
                    onChange={() => setShippingMethod("free")}
                  />
                  Free Shipping
                </span>
                <span className="font-semibold">$0.00</span>
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-300 p-3 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                  />
                  Express Shipping
                </span>
                <span className="font-semibold">$10.00</span>
              </label>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
          <ul className="mt-4 space-y-2 border-b border-slate-200 pb-4 text-sm">
            {cart.map((item) => (
              <li key={item.product.id} className="flex justify-between">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Place Order
          </button>
        </aside>
      </form>
    </section>
  );
}