import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-tchibo-cream min-h-[90vh] flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <p className="text-tchibo-red text-sm font-medium tracking-widest uppercase mb-4">Premium Roastery Since 1949</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-tchibo-dark leading-tight mb-6">
              Every Cup Tells a Story
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Discover the art of exceptional coffee. From single-origin beans to expertly crafted espresso — Tchibo brings the world's finest roasts to your cup.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="bg-tchibo-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition">
                View Menu
              </Link>
              <Link to="/contact" className="border border-tchibo-dark text-tchibo-dark px-8 py-3 rounded-full font-medium hover:bg-tchibo-beige transition">
                Reserve a Table
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="w-80 h-80 bg-tchibo-beige rounded-full flex items-center justify-center text-9xl shadow-inner">
              ☕
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-tchibo-dark">Why Tchibo?</h2>
          <p className="text-gray-500 mt-3">Crafted with care, served with passion.</p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: '🌍', title: 'Sourced Globally', desc: 'We partner with farms across Ethiopia, Colombia, and Brazil for the finest beans.' },
            { icon: '🔥', title: 'Roasted Freshly', desc: 'Small-batch roasting ensures peak flavor in every bag we sell.' },
            { icon: '🚀', title: 'Fast Delivery', desc: 'Order online and get your coffee delivered to your door within 48 hours.' }
          ].map(f => (
            <div key={f.title} className="text-center p-8 rounded-2xl border border-tchibo-beige bg-tchibo-cream">
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="font-serif text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-tchibo-dark text-white py-20 text-center">
        <h2 className="font-serif text-4xl font-bold mb-4">Ready to Experience Tchibo?</h2>
        <p className="text-gray-400 mb-8">Shop our full range of beans, machines, and accessories.</p>
        <Link to="/shop" className="bg-tchibo-red text-white px-10 py-3 rounded-full font-medium hover:bg-red-600 transition">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
