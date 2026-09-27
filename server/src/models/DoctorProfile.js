import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, default: "General Physician" },
    clinicName: { type: String, default: "MediQ Neighborhood Clinic" },
    consultationFee: { type: Number, default: 400 },
    slotMinutes: { type: Number, default: 15 },
    workingDays: { type: [String], default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    startHour: { type: Number, default: 10 },
    endHour: { type: Number, default: 18 }
  },
  { timestamps: true }
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);
