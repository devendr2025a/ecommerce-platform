const mongoose = require('mongoose');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentInfo, paymentMethod, items: clientItems } = req.body;

    // Check backend cart in DB
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product').catch(() => null);

    let orderItems = [];
    let itemsPrice = 0;

    // Prioritize clientItems if provided, otherwise fallback to DB cart
    const rawItems = (clientItems && Array.isArray(clientItems) && clientItems.length > 0)
      ? clientItems
      : (cart && cart.items && cart.items.length > 0)
      ? cart.items
      : [];

    if (!rawItems || rawItems.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    for (const item of rawItems) {
      const prodId = item.productId || item.product?._id || item.product || item._id;
      const name = item.name || item.product?.name || 'Grocery Item';
      const price = Number(item.price || item.finalPrice || item.product?.price || 50);
      const quantity = Math.max(1, Number(item.quantity || 1));
      const image = item.image || item.product?.images?.[0]?.url || item.images?.[0]?.url || '';

      orderItems.push({
        product: prodId,
        name,
        image,
        price,
        quantity,
      });

      itemsPrice += price * quantity;
    }

    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const taxPrice = Math.round(itemsPrice * 0.18 * 100) / 100;
    const totalPrice = Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100;

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod: paymentMethod || 'Online',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : (paymentInfo ? 'Paid' : 'Pending'),
      paymentInfo: paymentInfo || {},
      orderStatus: 'Processing',
      paidAt: (paymentMethod !== 'COD' && paymentInfo) ? new Date() : null,
    });

    // Decrease stock for DB products if valid ObjectId
    for (const item of orderItems) {
      if (item.product && mongoose.Types.ObjectId.isValid(String(item.product))) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        }).catch(() => {});
      }
    }

    // Clear backend cart if it exists
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }).catch(() => {});

    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find({ user: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments({ user: req.user._id }),
    ]);

    res.json({
      success: true,
      orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Allow access to own orders or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

// ===== Admin Order Controllers =====

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.status) query.orderStatus = req.query.status;
    if (req.query.paymentStatus) query.paymentStatus = req.query.paymentStatus;

    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(query),
    ]);

    res.json({
      success: true,
      orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();
    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getMyOrders, getOrder, getAllOrders, updateOrderStatus };
