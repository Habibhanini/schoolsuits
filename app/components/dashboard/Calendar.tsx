import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import Events from "./Events";

dayjs.extend(isoWeek);

const eventsList = [
  {
    title: "Year team meeting",
    location: "H8",
    class: "Class 13a",
    start: "14:00",
    end: "15:00",
    date: "2024-10-22",
  },
  {
    title: "7H tutor group",
    location: "H8",
    start: "16:00",
    end: "17:00",
    date: "2024-10-22",
  },
  {
    title: "Unit 6.4",
    location: "H7",
    start: "16:00",
    end: "17:00",
    date: "2024-10-22",
  },
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf("isoWeek");
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, "day"));
    }
    return days;
  };

  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(1, "week"));
  };

  const today = dayjs();

  const handleDayClick = (day: dayjs.Dayjs) => {
    setSelectedDate(day);
  };

  const filteredEvents = eventsList.filter((event) =>
    selectedDate.isSame(dayjs(event.date), "day")
  );

  return (
    <div className="bg-white p-6 rounded-3xl w-[20vw] min-w-[300px] max-w-[380px] h-[calc(100vh-8rem)] min-h-[700px]">
      {/* Month and Year Header with Arrows */}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-extrabold font-playfair">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <div className="flex space-x-1">
          <button
            onClick={handlePrevWeek}
            className="text-gray-500 hover:text-black"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextWeek}
            className="text-gray-500 hover:text-black"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Day Labels and Calendar Week Days */}
      <div className="grid grid-cols-7 gap-1">
        {getWeekDays().map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            className={`cursor-pointer text-center rounded-lg 
              ${
                day.isSame(today, "day")
                  ? "border-2 border-continue-yellow"
                  : ""
              } 
              ${
                selectedDate.isSame(day, "day")
                  ? "bg-continue-yellow text-white"
                  : "text-gray-900"
              }
              ${index >= 5 ? "text-gray-500" : ""}
              hover:bg-yellow-400 hover:text-white`}
          >
            <div className="text-[13px] font-jakarta mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </div>
            <div className="h-6 w-6 flex items-center justify-center text-[13px] rounded-full font-bold ml-1">
              {day.date()}
            </div>
          </div>
        ))}
      </div>

      {/* Events Section */}
      <Events events={filteredEvents} />
    </div>
  );
};

export default Calendar;
