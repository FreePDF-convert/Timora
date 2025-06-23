import { useEffect, useState } from "react";
export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then(setTasks);
  }, [token]);

  const addTask = () => {
    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title }),
    }).then(() => setTasks([...tasks, { title }]))
  };

  return (
    <div>
      <h2>Tareas</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Nueva tarea" />
      <button onClick={addTask}>Añadir</button>
      <ul>
        {tasks.map((t, i) => <li key={i}>{t.title}</li>)}
      </ul>
    </div>
  );
}