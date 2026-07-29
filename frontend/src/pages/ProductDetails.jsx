import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client.js';
import Loading from '../components/Loading.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch((err) => setError(err.response?.data?.message || 'Product not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading label="Loading product" />;

  if (error) {
    return (
      <section className="container-page py-16">
        <div className="glass-card p-8 text-center">
          <p className="font-semibold text-red-200">{error}</p>
          <Link to="/products" className="btn-primary mt-5">Back to products</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr]">
        <div className="glass-card p-4">
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full rounded-xl object-cover" />
        </div>
        <div className="glass-card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-moss">{product.category}</p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">{product.name}</h1>
          <p className="mt-4 text-3xl font-black text-violet">{formatCurrency(product.price)}</p>
          <p className="mt-5 leading-8 text-white/65">{product.description}</p>
          <div className="mt-6 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <p className="rounded-xl bg-white/10 px-4 py-3"><span className="font-bold text-white">Stock:</span> {product.stock}</p>
            <p className="rounded-xl bg-white/10 px-4 py-3"><span className="font-bold text-white">Rating:</span> {product.ratings || 0}/5</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              className="input-field sm:w-28"
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
            <button
              type="button"
              className="btn-primary flex-1"
              disabled={product.stock <= 0}
              onClick={() => addItem(product, quantity)}
            >
              Add to cart
            </button>
            <Link to="/products" className="btn-secondary">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
