"use client";
import { useState } from "react";

export default function SeatSelector() {
  const [selected, setSelected] = useState<number | null>(null);

  const seats = [1, 2, 3, 4, 5];

  return (
    <div>
      <h2>Wähle deinen Seat</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => setSelected(seat)}
            style={{
              padding: 10,
              background: selected === seat ? "black" : "lightgray",
              color: selected === seat ? "white" : "black",
            }}
          >
            Seat {seat}
          </button>
        ))}
      </div>

      {selected && <p>Du hast Seat {selected} gewählt</p>}
    </div>
  );
}
