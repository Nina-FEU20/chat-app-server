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
  },
});

io.on('connection', (socket) => {
  console.log('user logged in');

  socket.on('join room', (room, user) => {
    socket.join(room);
    console.log(user.username + ' joined room: ' + room);

    socket.broadcast.to(room).emit('message', user.username + ' joined room: ' + room);
  });

  socket.on('send message', (message) => {
    socket.to(message.chat).emit('new message', message);
  });

  socket.on('disconnect', () => {
    console.log('user left');
  });
});
