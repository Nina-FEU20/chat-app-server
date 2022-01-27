const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors'); 
const cookieParser = require('cookie-parser')
const connectDB = require('./config/connectDB')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')


connectDB();

app.use(cookieParser())
app.use(express.json())

app.use(
    cors({
      origin: [
        `${process.env.FRONT_URL}`,
      ],
      credentials: true
    })
  );


app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}!`));
