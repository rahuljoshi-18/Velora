import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function Cart() {
  const { user } = useAuth();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [address, setAddress] = useState({ fullName: user?.name || '', street: '', city: '', postalCode: '', country: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const placeOrder = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await api.post('/orders', {
        items: items.map((item) => ({
          productId: item._id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        totalAmount: subtotal,
        address,
        paymentId: 'manual-order',
      });
      clearCart();
      setAddress({ fullName: user?.name || '', street: '', city: '', postalCode: '', country: '' });
      setMessage('Order placed successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Cart</p>
          <h1 className="section-title mt-2">Your shopping cart</h1>
        </div>
        <Link to="/products" className="btn-secondary">Continue shopping</Link>
      </div>

      {message && <p className="mt-6 rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-200">{message}</p>}
      {error && <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}

      {items.length === 0 ? (
        <div className="glass-card mt-8 p-8 text-center">
          <p className="text-white/60">Your cart is empty.</p>
          <Link to="/products" className="btn-primary mt-5">Browse products</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item._id} className="glass-card grid gap-4 p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center">
                <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="mt-1 text-sm text-white/60">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    className="input-field w-24"
                    type="number"
                    min="1"
                    max={item.stock}
                    value={item.quantity}
                    onChange={(event) => updateQuantity(item._id, Number(event.target.value))}
                  />
                  <button type="button" className="text-sm font-bold text-red-300 transition hover:text-red-200" onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="glass-card h-fit p-5">
            <h2 className="text-xl font-black">Order summary</h2>
            <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/60">Subtotal</span>
              <span className="font-black">{formatCurrency(subtotal)}</span>
            </div>
            {!user ? (
              <Link to="/login" className="btn-primary mt-5 w-full">Sign in to place order</Link>
            ) : (
              <form onSubmit={placeOrder} className="mt-5 grid gap-3">
                <input className="input-field" placeholder="Full name" value={address.fullName} onChange={(event) => setAddress({ ...address, fullName: event.target.value })} required />
                <input className="input-field" placeholder="Street" value={address.street} onChange={(event) => setAddress({ ...address, street: event.target.value })} required />
                <input className="input-field" placeholder="City" value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} required />
                <input className="input-field" placeholder="Postal code" value={address.postalCode} onChange={(event) => setAddress({ ...address, postalCode: event.target.value })} required />
                <input className="input-field" placeholder="Country" value={address.country} onChange={(event) => setAddress({ ...address, country: event.target.value })} required />
                <button type="submit" className="btn-primary w-full" disabled={loading}>
                  {loading ? 'Placing order...' : 'Place order'}
                </button>
              </form>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
