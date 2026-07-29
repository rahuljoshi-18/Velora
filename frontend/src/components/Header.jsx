import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();

  const linkClass = ({ isActive }) => (
    `text-sm font-semibold transition duration-300 ${isActive ? 'text-violet' : 'text-white/70 hover:text-white'}`
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-charcoal/80 shadow-[0_12px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="text-xl font-black tracking-normal text-white">
          Velora
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" className="btn-secondary relative px-4">
            Cart
            {itemCount > 0 && (
              <span className="ml-2 rounded-full bg-violet px-2 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <button type="button" onClick={logout} className="btn-primary">
              Sign out
            </button>
          ) : (
            <Link to="/login" className="btn-primary">
              Sign in
            </Link>
          )}
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-charcoal/95 backdrop-blur-xl md:hidden">
          <div className="container-page grid gap-3 py-4">
            {[...navItems, ...(user ? [{ label: 'Profile', to: '/profile' }] : []), ...(isAdmin ? [{ label: 'Admin', to: '/admin' }] : [])].map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/cart" className="btn-secondary" onClick={() => setOpen(false)}>
              Cart ({itemCount})
            </Link>
            {user ? (
              <button type="button" onClick={() => { logout(); setOpen(false); }} className="btn-primary">
                Sign out
              </button>
            ) : (
              <Link to="/login" className="btn-primary" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
