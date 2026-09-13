import { useState } from 'react';
import { makeReservation } from '../services/api';

export default function ReservationForm() {
  const [form, setForm] = useState({ customer_name: '', email: '', phone: '', date: '', time: '', party_size: 2, notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await makeReservation({ ...form, party_size: parseInt(form.party_size) });
      setSuccess('🎉 Reservation confirmed! We\'ll send a confirmation to your email.');
      setForm({ customer_name: '', email: '', phone: '', date: '', time: '', party_size: 2, notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-sm border border-tchibo-beige">
      <h2 className="font-serif text-2xl text-tchibo-dark mb-2">Reserve a Table</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[['customer_name', 'Full Name', 'text'], ['email', 'Email Address', 'email'], ['phone', 'Phone (optional)', 'tel']].map(([name, placeholder, type]) => (
          <input key={name} name={name} type={type} placeholder={placeholder} value={form[name]} onChange={handleChange}
            required={name !== 'phone'}
            className="border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />
        ))}

        <input name="date" type="date" min={today} value={form.date} onChange={handleChange} required
          className="border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />

        <select name="time" value={form.time} onChange={handleChange} required
          className="border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red">
          <option value="">Select Time</option>
          {times.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select name="party_size" value={form.party_size} onChange={handleChange}
          className="border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
            <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
          ))}
        </select>
      </div>

      <textarea name="notes" placeholder="Special requests or notes (optional)" value={form.notes} onChange={handleChange} rows={3}
        className="w-full border border-tchibo-beige rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tchibo-red" />

      {success && <p className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">{success}</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" disabled={loading}
        className="w-full bg-tchibo-red text-white py-3 rounded-full font-medium hover:bg-red-700 transition disabled:opacity-50">
        {loading ? 'Booking...' : 'Confirm Reservation'}
      </button>
    </form>
  );
}
