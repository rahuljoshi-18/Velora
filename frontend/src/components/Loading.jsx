export default function Loading({ label = 'Loading' }) {
  return (
    <div className="container-page py-16">
      <div className="glass-card p-8 text-center text-sm font-semibold text-white/60">
        {label}...
      </div>
    </div>
  );
}
