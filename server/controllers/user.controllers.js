const User = require("../model/user.models");
const Invite = require("../model/invite.models");
const { createNotification } = require("./notification.controllers");
const catchAsync = require("../utils/catch-async");

// Send a friend invite
exports.sendInvite = catchAsync(async (req, res, next) => {
  const { recipientId } = req.params;
  const senderId = req.user._id; // assuming `req.user` holds the logged-in user's ID

  // Check if users are already friends
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return res.status(404).json({ message: "Recipient not found" });
  }

  // Create a new invite
  const invite = new Invite({
    sender: senderId,
    recipient: recipientId,
    status: "pending",
  });

  await invite.save();

  await createNotification(
    recipientId,
    "You have been invited to chat!",
    "invite"
  );
  res.status(201).json({ message: "Invite sent" });
});

// Respond to an invite
exports.respondToInvite = catchAsync(async (req, res, next) => {
  const { inviteId } = req.params;
  const { status } = req.body; // "accepted" or "declined"

  const invite = await Invite.findById(inviteId);
  if (!invite) {
    return res.status(404).json({ message: "Invite not found" });
  }

  // Update invite status
  invite.status = status;
  await invite.save();

  if (status === "accepted") {
    // Add each other to friends list
    const sender = await User.findById(invite.sender);
    const recipient = await User.findById(invite.recipient);

    sender.friends.push(recipient._id);
    recipient.friends.push(sender._id);

    await sender.save();
    await recipient.save();
  }

  res.status(200).json({ message: `Invite ${status}` });
});

// Get a list of friends
exports.getFriendsList = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: "Incorrect Id" });
  }

  res.status(200).json(user.friends);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await User.find();

  if (!user) {
    res.status(404).json({ message: "No user has been created" });
  }

  res.status(200).json(user);
});

// Get pending invites (both sent and received)
exports.getUserInvites = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const sentInvites = await Invite.find({
    sender: userId,
    status: "pending",
  }).populate("recipient", "username");

  const receivedInvites = await Invite.find({
    recipient: userId,
    status: "pending",
  }).populate("sender", "username");

  res.status(200).json({ sentInvites, receivedInvites });
});
