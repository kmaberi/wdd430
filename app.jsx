function useLocalStorageState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) return JSON.parse(raw);
    } catch {}
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

function TodoApp() {
  const [todos, setTodos] = useLocalStorageState("todos", []);
  const [text, setText] = React.useState("");
  const remaining = todos.filter((t) => !t.completed).length;

  function addTodo(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    const id = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    setTodos((prev) => [{ id, title, completed: false }, ...prev]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <main>
      <h1>Todo List</h1>
      <p className="muted">{remaining} item{remaining === 1 ? "" : "s"} left</p>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="New todo"
        />
        <button type="submit">Add</button>
        <button type="button" onClick={clearCompleted}>Clear completed</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <div className="left">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTodo(t.id)}
                aria-label={`Toggle ${t.title}`}
              />
              <span className="title" style={{ textDecoration: t.completed ? "line-through" : "none", opacity: t.completed ? 0.7 : 1 }}>
                {t.title}
              </span>
            </div>
            <button onClick={() => deleteTodo(t.id)} aria-label={`Delete ${t.title}`}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<TodoApp />);
