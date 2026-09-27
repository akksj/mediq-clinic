import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Book() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: "", date: "", slot: "10:00", reason: "Fever" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api("/api/appointments/doctors").then(setDoctors).catch(() => setDoctors([]));
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      await api("/api/appointments", { method: "POST", body: JSON.stringify(form) });
      setMessage("Appointment booked. Arrive 10 minutes early for token check-in.");
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <form className="card grid" onSubmit={onSubmit}>
      <h2>Book a consultation</h2>
      <select value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })} required>
        <option value="">Select doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
        ))}
      </select>
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      <input value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })} placeholder="10:00" />
      <input value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      <button type="submit">Confirm slot</button>
      {message && <p className="muted">{message}</p>}
    </form>
  );
}
