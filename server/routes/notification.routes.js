const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notification.controllers');
const authMiddleware = require('../middleware/auth.middleware'); // Assuming you have an auth middleware
const router = express.Router();

// Get notifications for a user
router.get('/', authMiddleware, getNotifications);

// Mark notification as read
router.put('/:notificationId/read', authMiddleware, markAsRead);

module.exports = router;