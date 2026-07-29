import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from || '/profile', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="glass-card w-full max-w-md p-6">
        <h1 className="text-2xl font-black">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-white/60">Sign in to manage your profile and orders.</p>
        {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            className="input-field"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-white/60">
          New to Velora? <Link to="/register" className="font-bold text-violet">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
