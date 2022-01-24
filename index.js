const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./connectDB')
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 

connectDB();

app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server is running on port ${process.env.PORT}!`));
