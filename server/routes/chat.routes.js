const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Route to create a new chat room
router.post("/create-room", authMiddleware, chatController.createRoom);

// Route to send a message in a chat room
router.post("/message/:id", chatController.sendMessage);

// Route to get chat messages from a room
router.get(
  "/messages/group/:roomId",
  authMiddleware,
  chatController.getRoomMessages
);

// Route to get individual chat messages
router.get(
  "/messages/:id",
  authMiddleware,
  chatController.getIndividualMessages
);

// Route to get a list of chat rooms a user is in
router.get("/rooms", authMiddleware, chatController.getUserRooms);

// Route to list all the participants in a chatroom
router.get('/room/info/:roomId', authMiddleware,  chatController.getRoomInfo);

// Route to delete a chat room
// router.delete("/room/:roomId", authMiddleware, chatController.deleteRoom);

// Route to invite users to a chat room
router.post(
  "/room/invite/:roomId/:userId",
  authMiddleware,
  chatController.inviteUserToRoom
);

module.exports = router;
