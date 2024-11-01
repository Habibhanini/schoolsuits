import React, { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek"; // Import dayjs ISO week plugin
import Events from "./Events";

dayjs.extend(isoWeek); // Enable ISO week plugin to handle week-based logic

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
  // State to track the current week and selected date
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Initialize selected date with the current date

  // Get the start and end dates for the current week
  const getWeekDays = () => {
    const startOfWeek = currentDate.startOf("isoWeek"); // Start of current week (Monday)
    const days = [];

    // Push each day of the current week (Mon-Sun)
    for (let i = 0; i < 7; i++) {
      days.push(startOfWeek.add(i, "day"));
    }

    return days;
  };

  // Functions to handle week navigation
  const handlePrevWeek = () => {
    setCurrentDate(currentDate.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.add(1, "week"));
  };

  // Today's date for comparison
  const today = dayjs();

  // Handle day click to select the clicked day
  const handleDayClick = (day: dayjs.Dayjs) => {
    setSelectedDate(day); // Set the selected date
  };

  const filteredEvents = eventsList.filter((event) =>
    selectedDate.isSame(dayjs(event.date), "day")
  );

  return (
    <div className="bg-white p-6 rounded-3xl  w-[460px] h-[820px]">
      {/* Month and Year Header with Arrows */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-extrabold font-playfair">
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
            onClick={() => handleDayClick(day)} // Handle click for both day and label
            className={`cursor-pointer text-center p-1 rounded-lg 
              ${
                day.isSame(today, "day")
                  ? "border-2 border-continue-yellow" // Border around the current date (today)
                  : ""
              } 
              ${
                selectedDate.isSame(day, "day")
                  ? "bg-continue-yellow text-white" // Fully colored for the selected day
                  : "text-gray-900"
              }
              ${index >= 5 ? "text-gray-500" : ""}
              hover:bg-yellow-400 hover:text-white`}
          >
            <div className="text-sm font-jakarta mb-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
            </div>
            <div className="h-6 w-6 flex items-center justify-center rounded-full font-bold ml-1">
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
