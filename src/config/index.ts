import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url as string);
    console.log(
      "-------------------------Connected db-----------------------------"
    );
  } catch (err) {
    console.error("Error connecting: ", err);
  }
};

export default connectDb;
