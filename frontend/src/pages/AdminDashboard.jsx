import { useEffect, useState } from 'react';
import api from '../api/client.js';
import { formatCurrency } from '../utils/formatters.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api.get('/analytics'),
      api.get('/orders'),
      api.get('/products'),
      api.get('/auth/users'),
    ])
      .then(([statsRes, ordersRes, productsRes, usersRes]) => {
        setStats(statsRes.data);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
        setUsers(usersRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || 'Unable to load admin dashboard.'));
  }, []);

  const cards = [
    { label: 'Revenue', value: stats ? formatCurrency(stats.totalRevenue) : '-' },
    { label: 'Orders', value: stats?.totalOrders ?? '-' },
    { label: 'Products', value: stats?.totalProducts ?? '-' },
    { label: 'Customers', value: stats?.totalUsers ?? '-' },
  ];

  return (
    <section className="container-page py-10">
      <div>
        <p className="eyebrow">Admin</p>
        <h1 className="section-title mt-2">Dashboard</h1>
      </div>

      {error && <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-5">
            <p className="text-sm font-semibold text-white/55">{card.label}</p>
            <p className="mt-2 text-3xl font-black">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="text-xl font-black">Latest orders</h2>
          <div className="mt-4 grid gap-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between gap-4 rounded-xl bg-white/10 p-4">
                <div>
                  <p className="font-bold">#{order._id.slice(-8)}</p>
                  <p className="text-sm text-white/60">{order.userId?.name || 'Customer'}</p>
                </div>
                <p className="font-black">{formatCurrency(order.totalAmount)}</p>
              </div>
            ))}
            {!orders.length && <p className="text-sm text-white/60">No orders found.</p>}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-xl font-black">Store snapshot</h2>
          <div className="mt-4 grid gap-3">
            <p className="rounded-xl bg-white/10 p-4 text-sm"><span className="font-bold text-white">{products.length}</span> products currently listed.</p>
            <p className="rounded-xl bg-white/10 p-4 text-sm"><span className="font-bold text-white">{users.length}</span> registered users visible to admins.</p>
            <p className="rounded-xl bg-white/10 p-4 text-sm">Basic admin overview connected to existing Velora APIs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
