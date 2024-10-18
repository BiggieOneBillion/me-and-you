const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chat.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const connectDB = require("./db/db");
const AppError = require("./utils/app-error");
const globalErrorHandler = require('./controllers/error.controllers')
// const ErrorHandler = require("./middleware/errorHandler");
// const { configDotenv } = require("dotenv");
const notificationRoutes = require("./routes/notification.routes");
const dotenv = require("dotenv");

dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Define routes
app.use("/api/auth", authRoutes); // Authentication routes (login, register)
app.use("/api/users", userRoutes); // User management routes
app.use("/api/chats", chatRoutes); // Chat-related routes
app.use("/api/notifications", notificationRoutes);

// catch all routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// Error handling middleware using the ERROR CLASS IN THE MIDDLEWARE.JS
// app.use(ErrorHandler.handleError);
// THIS IS HOW YOU WOULD USE IN IN THE CONTROLLER
// next(new ErrorHandler(400, error.message)); // Pass the error to the error handler

module.exports = app;
