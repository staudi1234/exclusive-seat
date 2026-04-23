export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Exclusive Seat</h1>
      {children}
    </div>
  );
}
