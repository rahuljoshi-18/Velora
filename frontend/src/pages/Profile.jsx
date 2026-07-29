import { useEffect, useState } from 'react';
import api from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatCurrency } from '../utils/formatters.js';

export default function Profile() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/orders/myorders')
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load orders.'));
  }, []);

  return (
    <section className="container-page py-10">
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="section-title mt-2">Profile</h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="glass-card h-fit p-5">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-violet text-2xl font-black text-white shadow-glow">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-xl font-black">{user.name}</h2>
          <p className="mt-1 text-sm text-white/60">{user.email}</p>
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-moss">
            {user.role}
          </p>
        </aside>

        <div className="glass-card p-5">
          <h2 className="text-xl font-black">Recent orders</h2>
          {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}
          <div className="mt-5 grid gap-4">
            {orders.map((order) => (
              <div key={order._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-bold">Order #{order._id.slice(-8)}</p>
                  <p className="text-sm font-bold text-violet">{order.status || 'Processing'}</p>
                </div>
                <p className="mt-2 text-sm text-white/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="mt-3 font-black">{formatCurrency(order.totalAmount)}</p>
              </div>
            ))}
            {!orders.length && !error && <p className="rounded-xl bg-white/10 p-5 text-sm text-white/60">No orders yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
