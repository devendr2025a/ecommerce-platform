const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
// @access  Private
const createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body; // amount in rupees

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const razorpay = getRazorpayInstance();

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    if (error.message === 'Razorpay credentials not configured') {
      return res.status(500).json({ success: false, message: error.message });
    }
    next(error);
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    res.json({
      success: true,
      message: 'Payment verified',
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get payment stats (Admin)
// @route   GET /api/payments/stats
// @access  Admin
const getPaymentStats = async (req, res, next) => {
  try {
    const [totalRevenue, orderStats, recentOrders] = await Promise.all([
      Order.aggregate([
        { $match: { paymentStatus: 'Paid' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]),
      Order.aggregate([
        {
          $group: {
            _id: '$orderStatus',
            count: { $sum: 1 },
            total: { $sum: '$totalPrice' },
          },
        },
      ]),
      Order.find({ paymentStatus: 'Paid' })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('user', 'name email'),
    ]);

    const monthlyRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$totalPrice' },
          orders: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    res.json({
      success: true,
      stats: {
        totalRevenue: totalRevenue[0]?.total || 0,
        orderStats,
        recentOrders,
        monthlyRevenue: monthlyRevenue.reverse(),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRazorpayOrder, verifyPayment, getPaymentStats };
