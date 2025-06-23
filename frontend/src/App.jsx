import React, { useState } from "react";
import TaskList from "./components/TaskList";
import HabitTracker from "./components/HabitTracker";
import CalendarView from "./components/CalendarView";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  return token ? (
    <div>
      <h1>EstuAI</h1>
      <TaskList token={token} />
      <HabitTracker token={token} />
      <CalendarView token={token} />
    </div>
  ) : (
    <Login setToken={setToken} />
  );
}

export default App;