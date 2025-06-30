const mongoose = require("mongoose");
require("dotenv").config();

const toconnectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Database connected Successfully");
  } catch (err) {
    console.log("Database not Connected");
  }
};

module.exports=toconnectDB