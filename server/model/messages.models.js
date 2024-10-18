// // models/Message.js
// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   room: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  content: {
    type: String,
    required: true,
  },
  emoji: {
    type: String, // Optional: For emoji-only messages
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
