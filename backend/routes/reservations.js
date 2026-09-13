import express from 'express';
import { body, validationResult } from 'express-validator';
import supabase from '../db/supabase.js';

const router = express.Router();

const reservationValidation = [
  body('customer_name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('date').isDate().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('party_size').isInt({ min: 1, max: 20 }).withMessage('Party size must be between 1 and 20'),
];

// POST /api/reservations
router.post('/', reservationValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  try {
    const { customer_name, email, phone, date, time, party_size, notes } = req.body;
    const { data, error } = await supabase.from('reservations').insert([
      { customer_name, email, phone, date, time, party_size, notes }
    ]).select().single();
    if (error) throw error;
    res.status(201).json({ success: true, message: 'Reservation made successfully!', data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/reservations/:id
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reservations').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
