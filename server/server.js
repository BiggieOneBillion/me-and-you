const http = require("http");
const app = require("./app");
const { initSocket } = require("./socket/socket");

// Create the HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Start the server and listen on the specified port
const PORT = process.env.PORT || 5050;

const machine = server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ! VERY IMPORTANT.
// process.on("unhandledRejection", (err) => {
//   console.log(err.name, err.message);
//   // shutting down the machine gracefully before terminating the process
//   machine.close(() => {
//     process.exit(1);
//   });
// });
