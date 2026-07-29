import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/profile', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-page grid min-h-[calc(100vh-8rem)] place-items-center py-12">
      <div className="glass-card w-full max-w-md p-6">
        <h1 className="text-2xl font-black">Create your account</h1>
        <p className="mt-2 text-sm leading-6 text-white/60">Join Velora to save your details and track orders.</p>
        {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            className="input-field"
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
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
            minLength="6"
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-white/60">
          Already have an account? <Link to="/login" className="font-bold text-violet">Sign in</Link>
        </p>
      </div>
    </section>
  );
}
