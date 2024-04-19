const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.MONGODB_URL, {}).then((data) => {
    console.log(`mongoDB connected with the server: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
