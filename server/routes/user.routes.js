const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const authMiddleware = require("../middleware/auth.middleware");

// Route to send a friend invite
router.post("/invite/:recipientId", authMiddleware, userController.sendInvite);

// Route to accept or decline an invite
router.post(
  "/invite-response/:inviteId",
  authMiddleware,
  userController.respondToInvite
);

// Route to get all friends of a user
router.get("/friends", authMiddleware, userController.getFriendsList);

router.get("/", authMiddleware, userController.getAllUsers);

// Route to get all pending invites (both sent and received)
router.get("/invites", authMiddleware, userController.getUserInvites);

module.exports = router;
