import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();


const mongoUrl= process.env.MONGO_URL || "mongodb://localhost:27017/testapi";

const connectMongoDB = async ()=> {
    mongoose
      .connect(mongoUrl)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((error) => {
        console.log("Error Connecting to MongoDB", error);
      });
}

export default connectMongoDB;