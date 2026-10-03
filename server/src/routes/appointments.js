import { Router } from "express";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { auth, allow } from "../middleware/auth.js";

const router = Router();

router.get("/doctors", async (_req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("name email phone");
  res.json(doctors);
});

router.post("/", auth, allow("patient", "reception"), async (req, res) => {
  const { doctorId, date, slot, reason, type } = req.body;
  if (!doctorId || !date || !slot) {
    return res.status(400).json({ message: "doctorId, date and slot are required" });
  }

  const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  let patientId = req.user._id;
  if (req.user.role === "reception") {
    if (!req.body.patientId) {
      return res.status(400).json({ message: "patientId is required when reception books" });
    }
    const patient = await User.findOne({ _id: req.body.patientId, role: "patient" });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    patientId = patient._id;
  }

  const clash = await Appointment.findOne({
    doctor: doctorId,
    date,
    slot,
    status: { $nin: ["cancelled", "no-show"] }
  });
  if (clash) return res.status(409).json({ message: "That slot is already taken" });

  try {
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      slot,
      reason: reason || "General checkup",
      type: type === "walkin" ? "walkin" : "booked"
    });
    res.status(201).json(appointment);
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: "That slot is already taken" });
    }
    throw error;
  }
});

router.get("/mine", auth, async (req, res) => {
  const filter =
    req.user.role === "doctor"
      ? { doctor: req.user._id }
      : req.user.role === "reception"
        ? {}
        : { patient: req.user._id };

  const list = await Appointment.find(filter)
    .populate("patient", "name phone email")
    .populate("doctor", "name")
    .sort({ date: 1, slot: 1 });

  res.json(list);
});

router.patch("/:id/status", auth, allow("doctor", "reception"), async (req, res) => {
  const { status, notes } = req.body;
  const allowed = ["booked", "waiting", "in-consult", "completed", "no-show", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const filter = { _id: req.params.id };
  if (req.user.role === "doctor") filter.doctor = req.user._id;

  const updated = await Appointment.findOneAndUpdate(
    filter,
    { status, ...(notes !== undefined ? { notes } : {}) },
    { new: true }
  );

  if (!updated) return res.status(404).json({ message: "Appointment not found" });
  res.json(updated);
});

export default router;
