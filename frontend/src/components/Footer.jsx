import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-tchibo-dark text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-serif text-xl mb-3">Tchibo Coffee Service</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium coffee roastery delivering exceptional taste since 1949.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/shop', 'Shop'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}><Link to={to} className="hover:text-white transition">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>123 Coffee Lane, Hamburg, Germany</li>
            <li>+49 40 1234 5678</li>
            <li>hello@tchibo-coffee.com</li>
            <li>Mon–Sat: 8am – 8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Tchibo Coffee Service. All rights reserved.
      </div>
    </footer>
  );
}
