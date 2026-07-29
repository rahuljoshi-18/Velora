import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="glass-card max-w-md p-8 text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-black">Page not found</h1>
        <p className="mt-3 text-white/60">The page you are looking for does not exist.</p>
        <Link to="/" className="btn-primary mt-6">Go home</Link>
      </div>
    </section>
  );
}
