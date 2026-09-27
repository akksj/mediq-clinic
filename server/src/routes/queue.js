import { Router } from "express";
import Appointment from "../models/Appointment.js";
import { auth, allow } from "../middleware/auth.js";

const router = Router();

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

router.get("/", async (req, res) => {
  const date = req.query.date || todayIso();
  const items = await Appointment.find({
    date,
    status: { $in: ["booked", "waiting", "in-consult"] }
  })
    .populate("patient", "name")
    .populate("doctor", "name")
    .sort({ tokenNumber: 1, slot: 1 });

  res.json({ date, items });
});

router.post("/check-in/:id", auth, allow("reception"), async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) return res.status(404).json({ message: "Appointment not found" });

  const last = await Appointment.find({ date: appointment.date, tokenNumber: { $ne: null } })
    .sort({ tokenNumber: -1 })
    .limit(1);

  appointment.tokenNumber = (last[0]?.tokenNumber || 0) + 1;
  appointment.status = "waiting";
  await appointment.save();
  res.json(appointment);
});

export default router;
