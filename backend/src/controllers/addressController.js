const Address = require('../models/Address');

// @desc    Get user addresses
// @route   GET /api/addresses
// @access  Private
const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ isDefault: -1 });
    res.json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Add address
// @route   POST /api/addresses
// @access  Private
const addAddress = async (req, res, next) => {
  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, country, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    // If first address, make it default
    const count = await Address.countDocuments({ user: req.user._id });
    const address = await Address.create({
      user: req.user._id,
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
      isDefault: isDefault || count === 0,
    });

    res.status(201).json({ success: true, message: 'Address added', address });
  } catch (error) {
    next(error);
  }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    if (req.body.isDefault) {
      await Address.updateMany({ user: req.user._id }, { isDefault: false });
    }

    const updated = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, message: 'Address updated', address: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    await address.deleteOne();

    // If deleted was default, make the first remaining one default
    if (address.isDefault) {
      const first = await Address.findOne({ user: req.user._id });
      if (first) {
        first.isDefault = true;
        await first.save();
      }
    }

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Set default address
// @route   PUT /api/addresses/:id/default
// @access  Private
const setDefaultAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    await Address.updateMany({ user: req.user._id }, { isDefault: false });
    address.isDefault = true;
    await address.save();

    res.json({ success: true, message: 'Default address updated', address });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress, setDefaultAddress };
