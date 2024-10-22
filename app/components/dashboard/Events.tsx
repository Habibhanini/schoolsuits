import React from "react";
import dayjs from "dayjs";

interface Event {
  title: string;
  location?: string;
  class?: string; // class is optional
  start: string;
  end: string;
  date: string;
}

interface EventsProps {
  events: Event[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  const now = dayjs(); // Get the current time
  const isEventOngoing = (start: string, end: string, date: string) => {
    const format = "YYYY-MM-DD HH:mm"; // Date and time format

    const startTime = dayjs(`${date} ${start}`, format);
    const endTime = dayjs(`${date} ${end}`, format);

    // Check if current time is within the event's time range or has passed the end time
    return (
      now.isAfter(startTime) && (now.isBefore(endTime) || now.isAfter(endTime))
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Events</h3>
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event, index) => {
            const eventOngoing = isEventOngoing(
              event.start,
              event.end,
              event.date
            );
            const eventBgColor = eventOngoing ? "bg-[#f1f1f1]" : "bg-[#fefbf4]";

            return (
              <div
                key={index}
                className={`${eventBgColor} rounded-lg p-3 flex justify-between items-center`}
              >
                <div>
                  <p className="text-sm font-bold">{event.title}</p>
                  {event.location && (
                    <p className="text-sm text-gray-400 font-bold">
                      at {event.location}
                    </p>
                  )}
                  {event.class && (
                    <p className="text-sm text-gray-400 font-bold">
                      with{" "}
                      <span className="text-school-blue font-bold">
                        {event.class}
                      </span>
                    </p>
                  )}
                </div>
                {/* Wrap time and button in a flex column */}
                <div className="flex flex-col items-end">
                  {/* Display the time above the button */}
                  <p className="text-sm font-bold text-continue-yellow">
                    {event.start} to {event.end}
                  </p>
                  {/* Show button only if the event is not ongoing */}
                  {!eventOngoing && (
                    <button
                      className="bg-continue-yellow text-white px-3 py-1 rounded-lg mt-1"
                      onClick={() =>
                        alert(`Starting ${event.class ? "Class" : "Reg"}`)
                      }
                    >
                      Start {event.class ? "Class" : "Reg"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No events for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
