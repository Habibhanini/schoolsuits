import React from "react";
import { Calendar, momentLocalizer, ToolbarProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./CalendarStyles.css"; // Custom CSS file

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  location: string;
}

// Sample event data
const events: Event[] = [
  {
    title: "5 min meeting",
    start: new Date(2024, 10, 8, 8, 0),
    end: new Date(2024, 10, 8, 8, 5),
    location: "A6",
  },
  {
    title: "10 min meeting",
    start: new Date(2024, 10, 8, 8, 10),
    end: new Date(2024, 10, 8, 8, 20),
    location: "H8",
  },
  {
    title: "20 min meeting",
    start: new Date(2024, 10, 8, 8, 20),
    end: new Date(2024, 10, 8, 8, 40),
    location: "H8",
  },
  {
    title: "Class 10Fr",
    start: new Date(2024, 10, 8, 8, 50),
    end: new Date(2024, 10, 8, 10, 0),
    location: "A6",
  },
];

// Custom toolbar component
const CustomToolbar = ({ label, onNavigate }: ToolbarProps<Event, object>) => (
  <div className="custom-toolbar">
    <button onClick={() => onNavigate("PREV")} className="toolbar-button">
      <FaChevronLeft />
    </button>
    <span className="toolbar-label">{label}</span>
    <button onClick={() => onNavigate("NEXT")} className="toolbar-button">
      <FaChevronRight />
    </button>
  </div>
);

// Custom event component
const CustomEvent = ({ event }: { event: Event }) => (
  <div
    className="custom-event"
    style={{
      backgroundColor: event.location === "A6" ? "#E0F7FA" : "#FFF3E0",
      borderLeft: `4px solid ${
        event.location === "A6" ? "#00ACC1" : "#FFB74D"
      }`,
    }}
  >
    <div className="event-title">
      <strong>{event.title}</strong>
      <span className="event-location">{event.location}</span>
    </div>
    <div className="event-time">
      {moment(event.start).format("h:mm a")} -{" "}
      {moment(event.end).format("h:mm a")}
    </div>
  </div>
);

const CalendarComponent = () => {
  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        style={{ height: 800 }}
      />
    </div>
  );
};

export default CalendarComponent;
