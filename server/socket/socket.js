const { Server } = require("socket.io");
const Message = require("../model/messages.models");
const ChatRoom = require("../model/chatroom.models");
const User = require("../model/user.models");
const {
  sendMessageToRoom,
  sendMessageToIndividual,
} = require("../controllers/chat.controller");
const { loginUser } = require("../controllers/auth.controllers");

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*", // You can restrict this based on your client app
      methods: ["GET", "POST"],
    },
  });

  // Connection event
  io.on("connection", (socket) => {
    console.log("New client connected: ", socket.id);

    // Join a chat room
    socket.on("joinRoom", async ({ roomId, userId }) => {
      const room = await ChatRoom.findById(roomId);
      if (room) {
        socket.join(roomId);
        // sends message to the client to show that the user has joined the room
        // io.to(roomId).emit("groupMessage", {
        //   user: "System",
        //   text: `User ${userId} has joined the room.`,
        // });
      }
    });

    // Send a message to an individual
    socket.on(
      "sendMessageToIndividual",
      async ({ id, userId, text, isGroup, name }) => {
        try {
          // Attempt to save the message to the database
          await sendMessageToIndividual(id, userId, text);
          // If successful, broadcast the message to the individual user          
          io.emit("message", {
            user: name,
            text,
          });
        } catch (error) {
          // Send an error event back to the sender/client
          io.emit("message_error", {
            error: "Failed to save the message. Please try again.",
            user: userId,
            text,
          });
        }
      }
    );

    // Send a message in a chat room
    socket.on("sendGroupMessage", async ({ id, userId, text, isGroup, name }) => {
        
      try {
        // Attempt to save the message to the database
        if (isGroup) {
          await sendMessageToRoom(id, userId, text);
          // If successful, broadcast the message to all clients in the room
          // io.to(id).emit("groupMessage", {
          //   user: userId,
          //   text,
          // });
          io.emit("groupMessage", {
            user: name,
            text,
          });
        } else {
          await sendMessageToIndividual(id, userId, text);
          // If successful, broadcast the message to the individual user
          io.to(id).emit("message", {
            user: userId,
            text,
          });
        }
      } catch (error) {
        console.error("Error saving message:", error);

        // Send an error event back to the sender/client
        socket.emit("message_error", {
          error: "Failed to save the message. Please try again.",
          user: userId,
          text,
        });
      }
    });

    // Leave a chat room
    socket.on("leaveRoom", ({ roomId, userId }) => {
      socket.leave(roomId);
      io.to(roomId).emit("message", {
        user: "System",
        text: `User ${userId} has left the room.`,
      });
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected: ", socket.id);
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIo,
};
