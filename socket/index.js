const io = require('socket.io')(8800, {
  cors:{
    origin: "http://localhost:3000"
  }
})

let activeUsers = [] 

io.on("connection", (socket)=>{
  
  //Add new user
  socket.on('new-user-add', (newUserId)=>{
    //If user is not added before
    if(!activeUsers.some((user)=> user.userId === newUserId)){
      activeUsers.push({
        userId: newUserId, 
        socketId: socket.id
      })
    }
    console.log("Connected Users", activeUsers)
    io.emit('get-users', activeUsers)
  })

  //Send Message
  socket.on("send-message", (data)=>{
    const {receiverId} = data;
    const user = activeUsers.find((user)=> user.userId === receiverId)
    console.log("Sending from Socket.io server to : ", receiverId)
    console.log("Data", data)
    if(user){
      io.to(user.socketId).emit("receive-message", data)
    }
  })

  socket.on("disconnect", ()=>{
    activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit('get-users', activeUsers)
  })
})