const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.MONGO_URL;
console.log(mongoURI)

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongo;
