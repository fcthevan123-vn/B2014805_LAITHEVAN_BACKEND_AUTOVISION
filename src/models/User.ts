import mongoose from "mongoose";
const { Schema, models } = mongoose;

const userSchema = new Schema(
  {
    fullName: String,
    email: { type: String, trim: true },
    password: String,
    type: { type: String, default: "user" },
    phone: String,
    address: String,
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
