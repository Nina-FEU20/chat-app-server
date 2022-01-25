const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log(`Error! ${err.message}`);
  }
};

module.exports = connectDB