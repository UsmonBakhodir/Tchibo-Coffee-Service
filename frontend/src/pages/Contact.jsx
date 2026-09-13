import ReservationForm from '../components/ReservationForm';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl font-bold text-tchibo-dark">Visit Us</h1>
        <p className="text-gray-500 mt-3">Reserve a table or get in touch</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-tchibo-dark mb-4">Location & Hours</h2>
            <div className="space-y-3 text-gray-600 text-sm">
              {[
                ['📍', 'Address', '123 Coffee Lane, Hamburg, Germany'],
                ['📞', 'Phone', '+49 40 1234 5678'],
                ['✉️', 'Email', 'hello@tchibo-coffee.com'],
                ['🕐', 'Mon – Fri', '8:00 AM – 8:00 PM'],
                ['🕐', 'Sat – Sun', '9:00 AM – 6:00 PM'],
              ].map(([icon, label, value]) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <span className="font-medium text-tchibo-dark">{label}: </span>
                    <span>{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="w-full h-56 bg-tchibo-beige rounded-2xl flex items-center justify-center text-gray-400 text-sm border border-tchibo-beige">
            🗺️ Map — embed your Google Maps iframe here
          </div>
        </div>

        {/* Reservation Form */}
        <ReservationForm />
      </div>
    </div>
  );
}
