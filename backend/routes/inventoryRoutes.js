const express = require('express');
const { getInventory, addInventory, updateInventory, deleteInventory } = require('../controllers/inventoryController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');

const router = express.Router();

// All inventory routes require authentication
router.get('/', protect, getInventory);

// Only admin can add/update/delete
router.post('/', protect, adminOnly, addInventory);
router.put('/:id', protect, adminOnly, updateInventory);
router.delete('/:id', protect, adminOnly, deleteInventory);

module.exports = router;