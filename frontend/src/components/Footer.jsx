export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="container-page grid gap-8 py-10 text-sm text-white/60 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-black text-white">Velora</p>
          <p className="mt-3 max-w-sm leading-6">Premium essentials, curated collections, and a polished shopping experience.</p>
          <div className="mt-5 flex gap-3">
            {['f', 'x', 'in'].map((item) => (
              <span key={item} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-xs font-bold text-white">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Explore</p>
          <div className="mt-3 grid gap-2">
            <a href="/products" className="hover:text-violet">Products</a>
            <a href="/cart" className="hover:text-violet">Cart</a>
            <a href="/profile" className="hover:text-violet">Profile</a>
          </div>
        </div>
        <div>
          <p className="font-bold text-white">Support</p>
          <div className="mt-3 grid gap-2">
            <span>Secure checkout</span>
            <span>Fast dispatch</span>
            <span>Premium support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
