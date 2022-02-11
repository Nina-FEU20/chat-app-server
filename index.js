const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const server = createServer(app);
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const jwt = require('jsonwebtoken');

const Message = require('./models/messageModel');
const User = require('./models/userModel');
const Chat = require('./models/chatModel');

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [`${process.env.FRONT_URL}`],
    credentials: true,
  })
);

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

server.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}!`));

/*********** SOCKETS.IO ************/

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    credentials: true,
  },
});

const verifyUser = async (socket) => {
  const token = socket.handshake.headers.cookie;

  if (!token) return;

  const jwtToken = token.slice(4);

  const verifiedUser = await jwt.verify(jwtToken, process.env.JWT_SECRET);

  const user = await User.findById(verifiedUser.id);
  return user;
};

io.on('connection', async (socket) => {
  console.log('connected');

  // upon login
  // create a room for the specific, single user so we can use that to send
  // information to that user
  socket.on('login', (user) => {
    socket.join(user.id);
    console.log(`You are logged in and connected and have joined room ${user.id} ! `);
  });

  socket.on('join room', (room, user) => {
    socket.join(room);

    if (user) {
      socket.broadcast.to(room).emit('message', user.username + ' joined room: ' + room);
    }
  });

  socket.on('send message', async (data) => {
    let createdMessage = await Message.create(data);
    const fullMessage = await Message.findById(createdMessage._id).populate('author', 'username').populate('chat');

    // Sending to all in room except sender
    // socket.to(chatId).emit('new message', fullMessage);

    // Sending to all in room, even sender
    io.in(data.chat).emit('new message', fullMessage);
  });

  socket.on('create chat', async (data, authUser) => {
    console.log(data);
    console.log(authUser);
    const users = data.users.filter((user) => user._id !== authUser.id);
    users.forEach((user) => {
      socket.to(user._id).emit('created chat', data);
    });
  });

  socket.on('disconnect', () => {
    console.log(`disconnected`);
  });
});
