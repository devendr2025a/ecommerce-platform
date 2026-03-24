const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentInfo } = req.body;

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Validate stock
    for (const item of cart.items) {
      if (!item.product || !item.product.isActive) {
        return res.status(400).json({ success: false, message: `Product unavailable` });
      }
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product.name}`,
        });
      }
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images[0]?.url || '',
      price: item.price,
      quantity: item.quantity,
    }));

    const itemsPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      paymentStatus: paymentInfo ? 'Paid' : 'Pending',
      paymentInfo: paymentInfo || {},
      orderStatus: 'Processing',
      paidAt: paymentInfo ? new Date() : null,
    });

    // Decrease stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

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
