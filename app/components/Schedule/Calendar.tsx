"use client";
import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

interface Event {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  room: string;
  type: "class" | "meeting" | "appointment";
  date: string; // Changed from 'day' to 'date' - stores full date in YYYY-MM-DD format
  unit?: string;
  description?: string;
}

const ModernCalendarScheduler = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Math Class 10Fr",
      startTime: "08:50",
      endTime: "10:00",
      room: "A6",
      type: "class",
      date: dayjs().format("YYYY-MM-DD"), // Today's date
      unit: "Unit 4.5",
      description: "Advanced algebra and functions",
    },
    {
      id: "2",
      title: "Team Meeting",
      startTime: "10:15",
      endTime: "11:00",
      room: "H8",
      type: "meeting",
      date: dayjs().format("YYYY-MM-DD"), // Today's date
      description: "Weekly progress review",
    },
    {
      id: "3",
      title: "Student Consultation",
      startTime: "14:00",
      endTime: "14:30",
      room: "B2",
      type: "appointment",
      date: dayjs().add(2, "day").format("YYYY-MM-DD"), // Day after tomorrow
      description: "One-on-one student support",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const timeSlots = Array.from({ length: 10 }, (_, i) => 8 + i); // 8 AM to 5 PM

  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf("isoWeek");
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"));
  };

  const handlePrevious = () => {
    if (viewMode === "week") setCurrentDate(currentDate.subtract(1, "week"));
    else if (viewMode === "month")
      setCurrentDate(currentDate.subtract(1, "month"));
    else setCurrentDate(currentDate.subtract(1, "day"));
  };

  const handleNext = () => {
    if (viewMode === "week") setCurrentDate(currentDate.add(1, "week"));
    else if (viewMode === "month") setCurrentDate(currentDate.add(1, "month"));
    else setCurrentDate(currentDate.add(1, "day"));
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "class":
        return {
          bg: "#fef7e6",
          border: "#f1b528",
          text: "#8b4513",
          roomBg: "#f1b528",
        };
      case "meeting":
        return {
          bg: "#f0f4ff",
          border: "#6495ed",
          text: "#1e40af",
          roomBg: "#6495ed",
        };
      case "appointment":
        return {
          bg: "#f0fdf4",
          border: "#10b981",
          text: "#047857",
          roomBg: "#10b981",
        };
      default:
        return {
          bg: "#f9fafb",
          border: "#d1d5db",
          text: "#374151",
          roomBg: "#6b7280",
        };
    }
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getEventPosition = (event: Event) => {
    const startMinutes = timeToMinutes(event.startTime);
    const endMinutes = timeToMinutes(event.endTime);
    const duration = endMinutes - startMinutes;

    const dayStart = 8 * 60; // 8 AM in minutes
    const top = ((startMinutes - dayStart) / 60) * 80; // 80px per hour
    const height = Math.max((duration / 60) * 80, 30); // Minimum 30px

    return { top, height };
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsCreating(false);
    setShowEventModal(true);
  };

  const handleCreateEvent = (targetDate: dayjs.Dayjs, timeSlot: number) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: "",
      startTime: `${timeSlot.toString().padStart(2, "0")}:00`,
      endTime: `${(timeSlot + 1).toString().padStart(2, "0")}:00`,
      room: "",
      type: "meeting",
      date: targetDate.format("YYYY-MM-DD"), // Store the actual date
      description: "",
    };
    setSelectedEvent(newEvent);
    setIsCreating(true);
    setShowEventModal(true);
  };

  const saveEvent = (event: Event) => {
    if (isCreating) {
      setEvents([...events, event]);
    } else {
      setEvents(events.map((e) => (e.id === event.id ? event : e)));
    }
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  // Updated function to get events for a specific date
  const getEventsForDate = (targetDate: dayjs.Dayjs) => {
    return events.filter((event) =>
      dayjs(event.date).isSame(targetDate, "day")
    );
  };

  // Day View Component
  const DayView = () => (
    <div className="flex-1 overflow-hidden">
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentDate.format("dddd, MMMM D, YYYY")}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2">
          <div className="border-r border-gray-200 bg-gray-50">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-gray-200 px-3 py-2 text-sm text-gray-600"
              >
                {hour === 12
                  ? "12:00 PM"
                  : hour > 12
                  ? `${hour - 12}:00 PM`
                  : `${hour}:00 AM`}
              </div>
            ))}
          </div>
          <div className="relative">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-gray-200 hover:bg-blue-50 cursor-pointer relative group"
                onClick={() => handleCreateEvent(currentDate, hour)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <FaPlus className="w-4 h-4 text-blue-500" />
                </div>
              </div>
            ))}
            <div className="absolute inset-0 pointer-events-none">
              {getEventsForDate(currentDate).map((event) => {
                const { top, height } = getEventPosition(event);
                const colors = getEventColor(event.type);
                return (
                  <div
                    key={event.id}
                    className="absolute left-2 right-2 rounded-lg border-l-4 p-3 cursor-pointer pointer-events-auto shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      top: `${top}px`,
                      height: `${height}px`,
                      backgroundColor: colors.bg,
                      borderLeftColor: colors.border,
                      borderWidth: "0 0 0 4px",
                    }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="flex items-start justify-between gap-2 h-full">
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-semibold text-sm"
                          style={{ color: colors.text }}
                        >
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {event.startTime} - {event.endTime}
                        </div>
                        {event.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {event.description}
                          </div>
                        )}
                      </div>
                      <div
                        className="px-2 py-1 rounded text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: colors.roomBg }}
                      >
                        {event.room}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Week View Component
  const WeekView = () => (
    <div className="flex-1 overflow-hidden">
      <div className="grid grid-cols-8 border-b border-gray-200 bg-gray-50">
        <div className="p-4 border-r border-gray-200"></div>
        {getWeekDays().map((day, index) => (
          <div key={index} className="p-4 border-r border-gray-200 text-center">
            <div className="text-sm font-semibold text-gray-700">
              {day.format("ddd")}
            </div>
            <div
              className={`text-lg font-bold mt-1 ${
                day.isSame(dayjs(), "day")
                  ? "text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                  : "text-gray-900"
              }`}
            >
              {day.format("D")}
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 min-h-full">
          <div className="border-r border-gray-200 bg-gray-50">
            {timeSlots.map((hour) => (
              <div
                key={hour}
                className="h-20 border-b border-gray-200 px-3 py-2 text-sm text-gray-600"
              >
                {hour === 12
                  ? "12:00 PM"
                  : hour > 12
                  ? `${hour - 12}:00 PM`
                  : `${hour}:00 AM`}
              </div>
            ))}
          </div>
          {getWeekDays().map((day, dayIndex) => (
            <div key={dayIndex} className="border-r border-gray-200 relative">
              {timeSlots.map((hour) => (
                <div
                  key={hour}
                  className="h-20 border-b border-gray-200 hover:bg-blue-50 cursor-pointer relative group"
                  onClick={() => handleCreateEvent(day, hour)}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <FaPlus className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              ))}
              <div className="absolute inset-0 pointer-events-none">
                {getEventsForDate(day).map((event) => {
                  const { top, height } = getEventPosition(event);
                  const colors = getEventColor(event.type);
                  return (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 rounded-lg border-l-4 p-2 cursor-pointer pointer-events-auto shadow-sm hover:shadow-md transition-shadow"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: colors.bg,
                        borderLeftColor: colors.border,
                        borderWidth: "0 0 0 4px",
                      }}
                      onClick={() => handleEventClick(event)}
                    >
                      <div className="flex items-start justify-between gap-2 h-full">
                        <div className="flex-1 min-w-0">
                          <div
                            className="font-semibold text-sm truncate"
                            style={{ color: colors.text }}
                          >
                            {event.title}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {event.startTime} - {event.endTime}
                          </div>
                          {event.unit && (
                            <div
                              className="text-xs font-medium mt-1"
                              style={{ color: colors.text }}
                            >
                              {event.unit}
                            </div>
                          )}
                        </div>
                        <div
                          className="px-2 py-1 rounded text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: colors.roomBg }}
                        >
                          {event.room}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Month View Component
  const MonthView = () => {
    const monthStart = currentDate.startOf("month");
    const monthEnd = currentDate.endOf("month");
    const calendarStart = monthStart.startOf("week");
    const calendarEnd = monthEnd.endOf("week");

    const calendarDays = [];
    let currentDay = calendarStart;

    while (currentDay.isBefore(calendarEnd)) {
      calendarDays.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return (
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-7 gap-0">
            {calendarDays.map((day, index) => {
              const dayEvents = getEventsForDate(day);

              return (
                <div
                  key={index}
                  className={`min-h-[120px] border-r border-b border-gray-200 p-2 hover:bg-gray-50 cursor-pointer ${
                    !day.isSame(currentDate, "month")
                      ? "bg-gray-100 text-gray-400"
                      : ""
                  } ${day.isSame(dayjs(), "day") ? "bg-blue-50" : ""}`}
                  onClick={() => handleCreateEvent(day, 9)}
                >
                  <div
                    className={`text-sm font-semibold mb-2 ${
                      day.isSame(dayjs(), "day")
                        ? "text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center"
                        : ""
                    }`}
                  >
                    {day.format("D")}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => {
                      const colors = getEventColor(event.type);
                      return (
                        <div
                          key={event.id}
                          className="text-xs p-1 rounded truncate cursor-pointer hover:shadow-sm"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            borderLeft: `3px solid ${colors.border}`,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEventClick(event);
                          }}
                        >
                          {event.startTime} {event.title}
                        </div>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            <h1 className="text-xl font-bold text-gray-900">
              {viewMode === "week"
                ? currentDate.format("MMMM YYYY")
                : viewMode === "month"
                ? currentDate.format("MMMM YYYY")
                : currentDate.format("MMMM D, YYYY")}
            </h1>

            <button
              onClick={handleNext}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(["day", "week", "month"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                    viewMode === mode
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentDate(dayjs())}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === "day" && <DayView />}
        {viewMode === "week" && <WeekView />}
        {viewMode === "month" && <MonthView />}
      </div>

      {/* Event Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isCreating ? "Create Event" : "Edit Event"}
                </h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={selectedEvent.title}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedEvent.date}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        date: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={selectedEvent.startTime}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          startTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={selectedEvent.endTime}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          endTime: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.room}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          room: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={selectedEvent.type}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          type: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="class">Class</option>
                      <option value="meeting">Meeting</option>
                      <option value="appointment">Appointment</option>
                    </select>
                  </div>
                </div>

                {selectedEvent.type === "class" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={selectedEvent.unit || ""}
                      onChange={(e) =>
                        setSelectedEvent({
                          ...selectedEvent,
                          unit: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={selectedEvent.description || ""}
                    onChange={(e) =>
                      setSelectedEvent({
                        ...selectedEvent,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                {!isCreating && (
                  <button
                    onClick={() => deleteEvent(selectedEvent.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FaTrash className="w-4 h-4" />
                    Delete
                  </button>
                )}
                <div className="flex items-center gap-3 ml-auto">
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEvent(selectedEvent)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isCreating ? "Create" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernCalendarScheduler;
