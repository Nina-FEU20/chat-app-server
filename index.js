const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB')
const userRoutes = require('./routes/userRoutes');

connectDB();

app.use(express.json())
app.use('/api/user', userRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}!`));
