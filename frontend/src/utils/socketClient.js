import { io } from "socket.io-client";

const SOCKET_URL = 'https://real-time-chat-app-server-3lxb.onrender.com';

const socketClient = io(SOCKET_URL, {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Try reconnecting 5 times
  reconnectionDelay: 1000, // Start with 1 sec delay
  reconnectionDelayMax: 5000, // Max delay of 5 sec
  transports: ["websocket"], // Use WebSocket directly for better performance
});

// Handle connection errors
socketClient.on("connect_error", (error) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("Socket connection error:", error);
  }
});

// Handle disconnect and auto-reconnect
socketClient.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    socketClient.connect(); // Manually reconnect if server disconnects
  }
});

export default socketClient;
