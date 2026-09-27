import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    slot: { type: String, required: true },
    reason: { type: String, default: "General checkup" },
    type: { type: String, enum: ["booked", "walkin"], default: "booked" },
    status: {
      type: String,
      enum: ["booked", "waiting", "in-consult", "completed", "no-show", "cancelled"],
      default: "booked"
    },
    tokenNumber: { type: Number, default: null },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

appointmentSchema.index({ doctor: 1, date: 1, slot: 1 }, { unique: true });

export default mongoose.model("Appointment", appointmentSchema);
