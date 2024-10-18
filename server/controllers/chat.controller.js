const ChatRoom = require("../model/chatroom.models");
const Message = require("../model/messages.models");
const User = require("../model/user.models");
const { createNotification } = require("./notification.controllers");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

// Create a new chat room

exports.createRoom = catchAsync(async (req, res, next) => {
  const { name, participants } = req.body;
  // Ensure room has at least 2 participants
  if (participants.length < 2) {
    return next(new AppError("A room must have at least 2 participants", 404));
  }
  // Create a new chat room
  const newRoom = new ChatRoom({
    name,
    participants,
  });

  await newRoom.save();
  res.status(201).json(newRoom);
});

// Send a message in a chat room
exports.sendMessage = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const senderId = req.user._id; // assuming `req.user` holds the logged-in user's ID

  const obj = {
    sender: senderId,
    content,
  };

  const chatRoom = await ChatRoom.findById(id);
  const recipient = await User.findById(id);

  if (chatRoom) {
    obj.chatRoom = id;
  } else if (recipient) {
    obj.recipient = id;
  } else {
    // return res
    //   .status(404)
    //   .json({ message: "Invalid Id, Could not find room or recipient" });
    return next(
      new AppError("Invalid Id, Could not find room or recipient", 404)
    );
  }
  // if (!chatRoom) {
  //   const recipient = await User.findById(roomId);
  //   if (!recipient) {
  //     return res.status(404).json({ message: "Chat room not found" });
  //   }
  // }

  // Create a new message
  const newMessage = new Message({
    ...obj,
  });

  await newMessage.save();

  if (recipient) {
    await createNotification(id, "You have a new message!", "message");
  }
  if (chatRoom) {
    chatRoom.messages.push(newMessage._id);
    await chatRoom.save();
  }

  res.status(201).json(newMessage);
});

exports.sendMessageToRoom = async (roomId, userId, text) => {
  try {
    const chatRoom = await ChatRoom.findById(roomId);

    if (!chatRoom) {
      throw new Error("Room Not Found", error);
    }

    // Create a new message
    const newMessage = new Message({
      content: text,
      sender: userId,
      chatRoom: roomId,
    });

    await newMessage.save();

    chatRoom.messages.push(newMessage._id);

    await chatRoom.save();
  } catch (error) {
    throw new Error("Server Error", error);
  }
};

exports.sendMessageToIndividual = async (recipientId, userId, text) => {
  try {
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      throw new Error("Recipeient Not Found", error);
    }

    // Create a new message
    const newMessage = new Message({
      content: text,
      sender: userId,
      recipient: recipientId,
    });

    await newMessage.save();

    await createNotification(recipientId, "You have a new message!", "message");
  } catch (error) {
    throw new Error("Server Error", error);
  }
};

exports.getUserRooms = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const chatrooms = await ChatRoom.find({
    participants: userId,
  });

  if (!chatrooms) {
    return next(new AppError("No room found", 404));
  }

  res.status(200).json(chatrooms);
});

// Get messages from a chat room
exports.getRoomMessages = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;

  const messages = await Message.find({ chatRoom: roomId }).populate(
    "sender",
    "username"
  );

  if (!messages) {
    return next(new AppError("No room message found", 404));
  }

  res.status(200).json(messages);
});

// get chatroom info-like participants in the group
exports.getRoomInfo = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;

  const chatroom = await ChatRoom.findById({ _id: roomId });

  if (!chatroom) {
    return next(new AppError("Chat room Id not correct", 404));
  }

  const users = await User.find({
    _id: { $in: chatroom.participants },
  }).select("username _id");

  if (!users) {
    return next(new AppError("No user found", 404));
  }

  res.status(200).json({ chatroom: chatroom, users });
});

// Get messages from a chat room
exports.getIndividualMessages = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const senderId = req.user._id;
  const messages = await Message.find(
    {
      $or: [
        { sender: senderId, recipient: id },
        { sender: id, recipient: senderId },
      ],
    }
    //   {
    //   sender: senderId,
    //   recipient: id,
    // }
  ).populate("sender", "username");

  if (!messages) {
    return next(new AppError(`No message found between users`, 404));
  }

  res.status(200).json(messages);
});

// Invite a user to a chat room
exports.inviteUserToRoom = catchAsync(async (req, res, next) => {
  const { roomId, userId } = req.params;

  const chatRoom = await ChatRoom.findById(roomId);

  if (!chatRoom) {
    return next(new AppError("Chat room not found", 404));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User Id not correct", 404));
  }

  if (chatRoom.participants.includes(userId)) {
    return next(new AppError("User is already in the room", 400));
  }

  chatRoom.participants.push(userId);

  await chatRoom.save();

  res.status(200).json({ message: "User invited to chat room" });
});
