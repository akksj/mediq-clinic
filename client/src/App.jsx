import { Link, Navigate, Route, Routes } from "react-router-dom";
import { clearSession, getUser } from "./api.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Book from "./pages/Book.jsx";
import QueueBoard from "./pages/QueueBoard.jsx";
import Desk from "./pages/Desk.jsx";

function Private({ children, roles }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const user = getUser();

  return (
    <div className="shell">
      <header>
        <Link className="brand" to="/">MediQ Clinic</Link>
        <nav>
          <Link to="/book">Book</Link>
          <Link to="/queue">Queue</Link>
          <Link to="/desk">Desk</Link>
          {user ? (
            <button onClick={() => { clearSession(); window.location.href = "/"; }}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<Private><Book /></Private>} />
        <Route path="/queue" element={<QueueBoard />} />
        <Route path="/desk" element={<Private roles={["doctor", "reception"]}><Desk /></Private>} />
      </Routes>
    </div>
  );
}
