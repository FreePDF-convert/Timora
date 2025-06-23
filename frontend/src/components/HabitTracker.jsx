import { useEffect, useState } from "react";
export default function HabitTracker({ token }) {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/habits", {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(setHabits);
  }, [token]);

  const addHabit = () => {
    fetch("http://localhost:5000/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ title: newHabit }),
    }).then(() => setHabits([...habits, { title: newHabit }]))
  };

  return (
    <div>
      <h2>Hábitos</h2>
      <input value={newHabit} onChange={e => setNewHabit(e.target.value)} placeholder="Nuevo hábito" />
      <button onClick={addHabit}>Añadir</button>
      <ul>
        {habits.map((h, i) => <li key={i}>{h.title}</li>)}
      </ul>
    </div>
  );
}