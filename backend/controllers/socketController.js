// const onlineUsers = {};

// function handleSocket(io) {
//   io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Handle user joining
//     socket.on('join', (username) => {
//       onlineUsers[socket.id] = username;
//       io.emit('onlineUsers', Object.values(onlineUsers));
//     });

//     // Handle sending messages
//     socket.on('sendMessage', (message) => {
//       const username = onlineUsers[socket.id] || 'Unknown';
//       io.emit('receiveMessage', {
//         text: message,
//         sender: username,
//         timestamp: Date.now()
//       });
//     });

//     // Handle user disconnection
//     socket.on('disconnect', () => {
//       delete onlineUsers[socket.id];
//       io.emit('onlineUsers', Object.values(onlineUsers));
//       console.log('User disconnected:', socket.id);
//     });
//   });
// }

// module.exports = { handleSocket };



const onlineUsers = {}; // Store users with socket IDs

function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle user joining
    socket.on('join', (username) => {
      onlineUsers[socket.id] = username; // Store username with socket ID
      io.emit('onlineUsers', Object.values(onlineUsers)); // Send updated list
      console.log(`User joined: ${username}`);
    });

    // Handle sending messages
    socket.on('sendMessage', (message) => {
      const username = onlineUsers[socket.id] || 'Unknown';
      io.emit('receiveMessage', {
        text: message.text,
        sender: username,
        timestamp: message.timestamp
      });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
      if (onlineUsers[socket.id]) {
        console.log(`User disconnected: ${onlineUsers[socket.id]}`);
        delete onlineUsers[socket.id]; // Remove user
        io.emit('onlineUsers', Object.values(onlineUsers)); // Send updated list
      }
    });
  });
}

module.exports = { handleSocket };
