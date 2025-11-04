import { Server } from "socket.io";
import http from "http";
import express from "express";

// Create an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Attach a Socket.IO server to the HTTP server
const io = new Server(server, {
  cors: {
    origin: ["https://heyyo-chatapp.onrender.com", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (recieverId) => {
  return userSocketMap[recieverId];
};
const userSocketMap = {}; // {userId: socketId};

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Export the Express app (for use in other files, e.g., for routes)
export { app, io, server };
