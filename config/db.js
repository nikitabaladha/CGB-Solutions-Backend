const mongoose = require("mongoose");
const config = require("config");

console.log(config.MONGO_URI);

const connectDB = async () => {
  try {
    mongoose.set("debug", (collectionName, method, query, doc) => {
      console.log(
        `Mongoose: ${collectionName}.${method}`,
        JSON.stringify(query),
        doc
      );
    });

    await mongoose.connect(config.get("MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
