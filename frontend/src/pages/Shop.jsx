import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import OrderForm from '../components/OrderForm';

const shopCategories = ['beans', 'machines', 'accessories'];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = shopCategories.map(c => getProducts(c));
        const results = await Promise.all(promises);
        setProducts(results.flatMap(r => r.data.data));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <div className="text-7xl mb-6">🎉</div>
          <h2 className="font-serif text-4xl font-bold text-tchibo-dark mb-4">Order Placed!</h2>
          <p className="text-gray-500 mb-8">Thank you! We'll confirm your order via email shortly.</p>
          <button onClick={() => { setOrderSuccess(false); setCart([]); }} className="bg-tchibo-red text-white px-8 py-3 rounded-full hover:bg-red-700 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-5xl font-bold text-tchibo-dark">Shop</h1>
          <p className="text-gray-500 mt-2">Beans, machines & accessories</p>
        </div>
        <button onClick={() => setShowCart(!showCart)} className="relative bg-tchibo-red text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-red-700 transition">
          🛒 Cart
          {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-tchibo-dark text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>}
        </button>
      </div>

      {/* Cart Summary */}
      {showCart && cart.length > 0 && (
        <div className="bg-white border border-tchibo-beige rounded-2xl p-6 mb-8">
          <h3 className="font-serif text-xl mb-4">Your Cart</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-tchibo-beige text-sm">
              <span>{item.name} × {item.qty}</span>
              <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-4 text-tchibo-red">
            <span>Total</span>
            <span>${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</span>
          </div>
          <button onClick={() => setShowOrderForm(true)} className="w-full mt-4 bg-tchibo-red text-white py-3 rounded-full font-medium hover:bg-red-700 transition">
            Proceed to Order
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-10">
        {['all', ...shopCategories].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition ${activeCategory === cat ? 'bg-tchibo-red text-white' : 'border border-tchibo-beige text-gray-600 hover:border-tchibo-red hover:text-tchibo-red'}`}>
            {cat === 'all' ? 'All Products' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading products...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} onAddToCart={addToCart} />)}
        </div>
      )}

      {showOrderForm && (
        <OrderForm
          cart={cart}
          onClose={() => setShowOrderForm(false)}
          onSuccess={() => { setShowOrderForm(false); setOrderSuccess(true); }}
        />
      )}
    </div>
  );
}
