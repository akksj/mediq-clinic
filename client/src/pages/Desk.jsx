import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Desk() {
  const [list, setList] = useState([]);

  async function load() {
    const data = await api("/api/appointments/mine");
    setList(data);
  }

  useEffect(() => { load().catch(() => setList([])); }, []);

  async function update(id, status) {
    await api(`/api/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
    await load();
  }

  async function checkIn(id) {
    await api(`/api/queue/check-in/${id}`, { method: "POST" });
    await load();
  }

  return (
    <section className="card grid">
      <h2>Clinic desk</h2>
      {list.map((item) => (
        <div className="row" key={item._id}>
          <div>
            <strong>{item.patient?.name}</strong>
            <div className="muted">{item.date} {item.slot} · {item.status}</div>
          </div>
          <div className="row">
            <button onClick={() => checkIn(item._id)}>Token</button>
            <button onClick={() => update(item._id, "in-consult")}>Start</button>
            <button onClick={() => update(item._id, "completed")}>Done</button>
          </div>
        </div>
      ))}
    </section>
  );
}
