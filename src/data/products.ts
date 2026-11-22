export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Laptop",
    price: 650,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFPeyuepPcn8ZHMWUcdihurQYqw2YbyeBayfV3FRc6Sg&s=10",
    description: "Lightweight everyday laptop for work and study.",
  },
  {
    id: 2,
    name: "Mouse",
    price: 15,
    image: "https://i.rtings.com/assets/pages/Fr5czRHa/best-gaming-mouse-20260119-2-medium.jpg?format=auto",
    description: "Responsive wireless optical mouse.",
  },
  {
    id: 3,
    name: "Keyboard",
    price: 25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sa7KbbahYXQbckKACPPkf5sbpRcuZCiqJf0i5FyAlQ&s=10",
    description: "Compact tactile keyboard for comfortable typing.",
  },
  {
    id: 4,
    name: "Monitor",
    price: 120,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe6cHvm4Bk51JL8vYSJJYR8SyhS3M0-c24sYeN2vHdA&s=10",
    description: "Full HD desktop monitor with crisp colors.",
  },
];