const mongoose = require("mongoose");

const connectDb = async () => {
  // 9.1
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING); // 9.2
    console.log(
      "database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) { // 9.3
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
