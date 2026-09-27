import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDb } from "./config/db.js";
import User from "./models/User.js";
import DoctorProfile from "./models/DoctorProfile.js";

async function seed() {
  await connectDb(process.env.MONGO_URI);
  const passwordHash = await bcrypt.hash("Password123", 10);

  const doctor = await User.findOneAndUpdate(
    { email: "doctor@mediq.local" },
    { name: "Dr. Mehta", email: "doctor@mediq.local", passwordHash, role: "doctor", phone: "9876500001" },
    { upsert: true, new: true }
  );

  await DoctorProfile.findOneAndUpdate(
    { user: doctor._id },
    { user: doctor._id, specialization: "General Physician", clinicName: "MediQ Neighborhood Clinic" },
    { upsert: true }
  );

  await User.findOneAndUpdate(
    { email: "desk@mediq.local" },
    { name: "Rina (Reception)", email: "desk@mediq.local", passwordHash, role: "reception", phone: "9876500002" },
    { upsert: true }
  );

  await User.findOneAndUpdate(
    { email: "patient@mediq.local" },
    { name: "Amit Sharma", email: "patient@mediq.local", passwordHash, role: "patient", phone: "9876500003" },
    { upsert: true }
  );

  console.log("Seed complete. Logins use Password123");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
