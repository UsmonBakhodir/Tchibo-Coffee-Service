import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const drinkCategories = ['espresso', 'cappuccino', 'latte', 'filter'];

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const promises = drinkCategories.map(c => getProducts(c));
        const results = await Promise.all(promises);
        const all = results.flatMap(r => r.data.data);
        setProducts(all);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-5xl font-bold text-tchibo-dark">Our Menu</h1>
        <p className="text-gray-500 mt-3">Expertly crafted drinks for every taste</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {['all', ...drinkCategories].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition ${activeCategory === cat ? 'bg-tchibo-red text-white' : 'border border-tchibo-beige text-gray-600 hover:border-tchibo-red hover:text-tchibo-red'}`}>
            {cat === 'all' ? 'All Drinks' : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading menu...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
