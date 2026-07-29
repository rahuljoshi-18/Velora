import { useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setProducts(data))
      .catch((err) => setError(err.response?.data?.message || 'Unable to load products.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <Loading label="Loading products" />;

  return (
    <section className="container-page py-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1 className="section-title mt-2">Shop Velora products</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_180px] md:w-[520px]">
          <input
            className="input-field"
            type="search"
            placeholder="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <select className="input-field" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="mt-6 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {!filteredProducts.length && !error && (
        <div className="glass-card mt-8 p-8 text-center text-white/60">
          No products match your filters.
        </div>
      )}
    </section>
  );
}
