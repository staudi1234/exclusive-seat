"use client";
import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Exclusive Seat</h1>
      <p>Deine App läuft 🎉</p>

      <button
        onClick={() => setCount(count + 1)}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Klick mich ({count})
      </button>
    </div>
  );
}
