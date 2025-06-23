import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function CalendarView({ token }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => {
        const evts = data.map(t => ({ title: t.title, date: new Date().toISOString().split('T')[0] }))
        setEvents(evts);
      });
  }, [token]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
    />
  );
}