export default function About() {
  return (
    <div>
      <section className="bg-tchibo-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-tchibo-red text-sm font-medium tracking-widest uppercase mb-3">Our Story</p>
          <h1 className="font-serif text-5xl font-bold text-tchibo-dark mb-6">Born From a Passion for Coffee</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Founded in Hamburg in 1949, Tchibo has been on a mission to bring extraordinary coffee to every home and café table. What started as a mail-order business has grown into one of the world's most beloved coffee roasteries.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="w-full h-80 bg-tchibo-beige rounded-2xl flex items-center justify-center text-8xl">🫘</div>
          <div>
            <h2 className="font-serif text-4xl font-bold text-tchibo-dark mb-4">Our Roasting Philosophy</h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              We believe great coffee starts with great relationships. Our team travels the world to find the finest single-origin beans, working directly with farmers who share our commitment to quality and sustainability.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Every batch is roasted in small quantities to ensure peak freshness and flavor consistency. We never compromise — from the farm to your cup.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-tchibo-cream">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-tchibo-dark">By the Numbers</h2>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['1949', 'Founded'], ['75+', 'Years of Excellence'], ['30+', 'Countries'], ['10M+', 'Cups Daily']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="font-serif text-5xl font-bold text-tchibo-red mb-2">{num}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
