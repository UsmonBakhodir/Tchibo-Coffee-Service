export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-tchibo-beige">
      <div className="h-44 bg-tchibo-beige flex items-center justify-center">
        {product.image_url
          ? <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          : <span className="text-5xl">☕</span>
        }
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-tchibo-dark">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-tchibo-red font-semibold text-lg">${product.price}</span>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="bg-tchibo-red text-white text-sm px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
