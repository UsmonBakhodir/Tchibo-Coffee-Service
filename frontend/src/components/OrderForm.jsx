import { useState } from 'react';
import { placeOrder } from '../services/api';

export default function OrderForm({ cart, onClose, onSuccess }) {
  const [form, setForm] = useState({ customer_name: '', email: '', phone: '', delivery_type: 'pickup', address: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const items = cart.map(i => ({ product_id: i.id, name: i.name, quantity: i.qty, price: i.price }));
      await placeOrder({ ...form, items, total: parseFloat(total) });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-serif text-2xl">Complete Order</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>

        <div className="bg-tchibo-cream rounded-xl p-4 mb-4 text-sm">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between py-1">
              <span>{item.name} × {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-tchibo-beige mt-2 pt-2 font-semibold flex justify-between">
            <span>Total</span><span className="text-tchibo-red">${total}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[['customer_name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone (optional)', 'tel']].map(([name, placeholder, type]) => (
            <input key={name} name={name} type={type} placeholder={placeholder} value={form[name]} onChange={handleChange}
              required={name !== 'phone'}
              className="w-full border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />
          ))}

          <select name="delivery_type" value={form.delivery_type} onChange={handleChange}
            className="w-full border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red">
            <option value="pickup">Pickup</option>
            <option value="delivery">Delivery</option>
          </select>

          {form.delivery_type === 'delivery' && (
            <input name="address" placeholder="Delivery Address" value={form.address} onChange={handleChange} required
              className="w-full border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />
          )}

          <textarea name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} rows={2}
            className="w-full border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-tchibo-red text-white py-3 rounded-full font-medium hover:bg-red-700 transition disabled:opacity-50">
            {loading ? 'Placing Order...' : `Place Order — $${total}`}
          </button>
        </form>
      </div>
    </div>
  );
}
