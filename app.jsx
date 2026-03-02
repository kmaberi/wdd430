function App() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  return (
    <main style={{ fontFamily: "system-ui, Arial, sans-serif", padding: 24 }}>
      <h1>React via CDN</h1>
      <p>
        Hello {name ? name : "there"}! You have clicked {count} time
        {count === 1 ? "" : "s"}.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <label>
        Your name:{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
        />
      </label>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
