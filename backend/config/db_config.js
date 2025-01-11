const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`.bgBlue.white);
  } catch (error) {
    console.log(`DB CONNECTION FAILED: ${error.message}`.bgRed.black);
  }
};

module.exports = connectDB;
