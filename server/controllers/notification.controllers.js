const Notification = require("../model/notification.models");
const catchAsync = require("../utils/catch-async");

// Function to create a notification
exports.createNotification = async (userId, message, type) => {
  try {
    const notification = await Notification.create({
      user: userId,
      message,
      type,
    });
    return notification;
  } catch (error) {
    throw new Error("Unable to create notification");
  }
};

// Function to get notifications for a user
exports.getNotifications = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // Assume user ID is in req.user after authentication

  const notifications = await Notification.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    data: notifications,
  });
});

// Function to mark notification as read
exports.markAsRead = catchAsync(async (req, res, next) => {
  const { notificationId } = req.params;

  await Notification.findByIdAndUpdate(notificationId, { isRead: true });

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});
