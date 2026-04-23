function RestLayoutView({ rid }) {
  const { t } = useLang();

  const tables = ls.get("es3_tables", []).filter(tb => tb.rid === rid);
  const walls  = ls.get("es3_walls", []).filter(w => w.rid === rid);

  const res = ls.get("es3_reservations", []);

  const bookedIds = res
    .filter(r => r.rid === rid && r.date === today() && r.status !== "cancelled")
    .map(r => r.tableId);

  const locks = getLocks();
  const lockedIds = Object.keys(locks);

  return (
    <div>
      <div className="sec-t">{t.todayMap}</div>
      <p style={{ fontSize: 10.5, color: "var(--tx3)", marginBottom: 10 }}>
        {t.readOnly}
      </p>

      <CanvasView
        tables={tables}
        walls={walls}
        bookedIds={bookedIds}
        lockedIds={lockedIds}
        W={600}
        H={360}
      />

      <div className="legend" style={{ marginTop: 8 }}>
        <span>
          <span className="ld" style={{ borderColor: "#333", color: "#333" }} />
          {t.available}
        </span>

        <span>
          <span className="ld" style={{ borderColor: "var(--er)", color: "var(--er)" }} />
          {t.reserved}
        </span>

        <span>
          <span className="ld" style={{ borderColor: "var(--wn)", color: "var(--wn)" }} />
          {t.locked}
        </span>
      </div>
    </div>
  );
}
