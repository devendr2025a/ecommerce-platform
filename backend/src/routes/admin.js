const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsers, getUserDetails, toggleUserStatus } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.use(protect, adminOnly);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id/toggle', toggleUserStatus);

module.exports = router;
