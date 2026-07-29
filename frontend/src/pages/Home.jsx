import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import { formatCurrency } from '../utils/formatters.js';

const demoProducts = [
  {
    _id: 'demo-1',
    name: 'Astra Knit Jacket',
    category: 'Outerwear',
    price: 6999,
    ratings: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-2',
    name: 'Noir Runner Sneakers',
    category: 'Footwear',
    price: 8499,
    ratings: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-3',
    name: 'Muse Leather Tote',
    category: 'Bags',
    price: 9999,
    ratings: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-4',
    name: 'Orbit Chrono Watch',
    category: 'Accessories',
    price: 11999,
    ratings: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-5',
    name: 'Luma Desk Lamp',
    category: 'Home',
    price: 4499,
    ratings: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-6',
    name: 'Velvet Studio Chair',
    category: 'Home',
    price: 14999,
    ratings: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-7',
    name: 'Aurora Headphones',
    category: 'Tech',
    price: 12999,
    ratings: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    _id: 'demo-8',
    name: 'Minimal Ceramic Set',
    category: 'Dining',
    price: 3999,
    ratings: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['All', 'Outerwear', 'Footwear', 'Bags', 'Accessories', 'Home', 'Tech'];

function DemoProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet/50 hover:shadow-soft">
      <div className="overflow-hidden bg-stone">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-moss">{product.category}</p>
          <p className="text-xs font-bold text-amber-300">{product.ratings} stars</p>
        </div>
        <h3 className="mt-2 text-lg font-bold text-white">{product.name}</h3>
        <p className="mt-3 text-xl font-black">{formatCurrency(product.price)}</p>
      </div>
    </article>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(({ data }) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.26),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(167,139,250,0.22),transparent_26rem)]" />
        <div className="container-page relative grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1fr_0.9fr]">
          <div className="max-w-2xl">
            <p className="eyebrow">Premium dark collection</p>
            <h1 className="mt-4 text-5xl font-black tracking-normal text-white sm:text-6xl lg:text-7xl">
              Velora
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">
              Curated essentials with polished details, luminous accents, and a shopping experience that feels refined from first glance.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/products" className="btn-primary">
                Shop products
              </Link>
              <Link to="/register" className="btn-secondary">
                Create account
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {categories.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white/80 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-card p-4">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
                alt="Velora fashion editorial"
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
            </div>
            <div className="grid content-end gap-4">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
                alt="Velora premium accessories"
                className="aspect-square w-full rounded-2xl object-cover shadow-soft"
              />
              <div className="glass-card p-5 text-white">
                <p className="text-3xl font-black">Elevated</p>
                <p className="mt-2 text-sm leading-6 text-white/70">Dark surfaces, vivid accents, and a clean path to checkout.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">New arrivals</p>
              <h2 className="section-title mt-2">Fresh picks from Velora</h2>
            </div>
            <Link to="/products" className="text-sm font-bold text-violet hover:text-white">
              View all products
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(featured.length ? featured.slice(0, 4) : demoProducts.slice(0, 4)).map((product) => (
              featured.length ? <ProductCard key={product._id} product={product} /> : <DemoProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page">
          <div className="glass-card overflow-hidden p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
              <div>
                <p className="eyebrow">Limited edit</p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Upgrade your everyday rotation</h2>
                <p className="mt-3 max-w-2xl leading-7 text-white/65">Premium pieces, clean silhouettes, and bold purple accents for a storefront that feels sharp and current.</p>
              </div>
              <Link to="/products" className="btn-primary lg:justify-self-end">Shop the edit</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-page">
          <div>
            <p className="eyebrow">Best sellers</p>
            <h2 className="section-title mt-2">Loved by Velora shoppers</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {demoProducts.slice(4, 8).map((product) => (
              <DemoProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
