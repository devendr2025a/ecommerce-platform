const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyPayment, getPaymentStats } = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect);

router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPayment);
router.get('/stats', adminOnly, getPaymentStats);

module.exports = router;
