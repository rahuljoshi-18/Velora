import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet/50 hover:shadow-soft">
      <Link to={`/products/${product._id}`} className="block overflow-hidden bg-stone">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="grid gap-4 p-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-moss">{product.category}</p>
            <p className="text-xs font-bold text-amber-300">{product.ratings || 4.8} stars</p>
          </div>
          <Link to={`/products/${product._id}`} className="mt-2 block text-lg font-bold text-white hover:text-violet">
            {product.name}
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/60">{product.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-black">{formatCurrency(product.price)}</p>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="btn-primary min-h-10 px-4"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add' : 'Sold out'}
          </button>
        </div>
      </div>
    </article>
  );
}
