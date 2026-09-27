import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["patient", "doctor", "reception"],
      default: "patient"
    },
    phone: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
