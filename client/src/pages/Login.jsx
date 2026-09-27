import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setSession } from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "patient@mediq.local", password: "Password123" });
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });
      setSession(data.token, data.user);
      navigate(data.user.role === "patient" ? "/book" : "/desk");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="card grid" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="muted">{error}</p>}
      <button type="submit">Enter clinic</button>
      <p className="muted">Seed users: patient@, doctor@, desk@mediq.local / Password123</p>
    </form>
  );
}
