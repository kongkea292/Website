import { PRODUCTS, type Product } from "../data/products";
import type { OrderRecord } from "../types/store";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://api.example.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data: Product[] = await response.json();
    return data.length > 0 ? data.slice(0, 4) : PRODUCTS.slice(0, 4);
  } catch {
    // Fallback to local 4 products if no real backend is running yet
    return PRODUCTS.slice(0, 4);
  }
}

export async function submitOrder(order: OrderRecord): Promise<OrderRecord> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error(`Order failed: ${response.status}`);
    }
    return (await response.json()) as OrderRecord;
  } catch {
    // Return local order record if testing frontend before backend is ready
    return order;
  }
}