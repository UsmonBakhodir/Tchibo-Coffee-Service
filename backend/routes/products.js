import express from 'express';
import supabase from '../db/supabase.js';

const router = express.Router();

// GET /api/products — fetch all products
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = supabase.from('products').select('*').eq('in_stock', true);
    if (category) query = query.eq('category', category);
    const { data, error } = await query.order('created_at', { ascending: true });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:id — fetch single product
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
