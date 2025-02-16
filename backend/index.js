const http = require('http')
const socketIo = require('socket.io')
const { handleSocket } = require('./controllers/socketController');

// Create an HTTP server
const server = http.createServer();
const io = socketIo(server, {
  cors: {
    origin: "*" // Allow all origins (change this in production)
  }
});

// Initialize socket handling
handleSocket(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
