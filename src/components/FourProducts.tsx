import type { Product } from "../data/products";

interface FourProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function FourProducts({
  products,
  onAddToCart,
}: FourProductsProps) {
  const fourProducts = products.slice(0, 4);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Products 
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {fourProducts.map((product) => (
          <article
            key={product.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="mb-4 aspect-[4/3] w-full rounded-lg object-cover"
              />
              <h3 className="text-base font-semibold text-slate-900">
                {product.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500">{product.description}</p>
              <p className="mt-2 text-sm font-bold text-slate-800">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="mt-4 w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}