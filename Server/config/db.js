// Server / config / db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected!"),
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/HireNest`);
  } catch (error) {
    console.error("Database Connection Error:", error.message);
  }
};

export default connectDB;
