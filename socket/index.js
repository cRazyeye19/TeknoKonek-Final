import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const io = new Server(process.env.PORT || 8800, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from Socket.io server to : ", receiverId);
    console.log("Data", data);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});

const PORT = process.env.PORT || 8000;
io.listen(PORT);
console.log(`Socket server running on port ${PORT}`);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);
console.log("PORT:", process.env.PORT);
