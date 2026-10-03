import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function QueueBoard() {
  const [board, setBoard] = useState({ date: "", items: [] });

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const data = await api("/api/queue");
        if (alive) setBoard(data);
      } catch {
        if (alive) setBoard({ date: "", items: [] });
      }
    }
    load();
    const timer = setInterval(load, 10000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  const current = board.items.find((item) => item.status === "in-consult");

  return (
    <div className="grid">
      <section className="card">
        <p className="muted">Now consulting</p>
        <div className="token">Token {current?.tokenNumber || "--"}</div>
        <p>{current ? current.patient?.name : "No patient in cabin"}</p>
      </section>
      <section className="card">
        <h3>Waiting room · {board.date}</h3>
        {board.items.map((item) => (
          <div className="row" key={item._id}>
            <strong>#{item.tokenNumber || "-"} {item.patient?.name}</strong>
            <span className="muted">{item.status} · {item.slot}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
