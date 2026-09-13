import express from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../db/supabase.js';

const router = express.Router();

const orderValidation = [
  body('customer_name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('total').isNumeric().withMessage('Total must be a number'),
  body('delivery_type').isIn(['delivery', 'pickup']).withMessage('Invalid delivery type'),
  body('address').if(body('delivery_type').equals('delivery')).notEmpty().withMessage('Address is required for delivery'),
];

// POST /api/orders
router.post('/', orderValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const { customer_name, email, phone, items, total, delivery_type, address, notes } = req.body;
    const { data, error } = await supabase.from('orders').insert([
      { customer_name, email, phone, items, total, delivery_type, address, notes }
    ]).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, message: 'Order placed successfully!', data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/:id — track order
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
