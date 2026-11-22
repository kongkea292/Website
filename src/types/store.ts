import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShippingMethod = "free" | "express";

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  shippingMethod: ShippingMethod;
}

export interface OrderRecord {
  orderId: string;
  orderDate: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  status: "Pending";
}