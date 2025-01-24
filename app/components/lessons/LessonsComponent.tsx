import React, { useState } from "react";

const LessonsComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("French");

  const categories = [
    "Citizenship",
    "Computing",
    "Drama",
    "English",
    "French",
    "German",
    "Mandarin",
    "Math",
    "Music",
    "Languages",
    "Science",
  ];

  const lessons = [
    {
      id: 1,
      unit: "Unit 1.1F",
      description: "Lesson about cognition and social abilities",
      teachers: 5,
    },
    {
      id: 2,
      unit: "Unit 2.1F",
      description: "Lesson about cognition and social abilities",
      teachers: 5,
    },
    {
      id: 3,
      unit: "Unit 3.1F",
      description: "Lesson about cognition and social abilities",
      teachers: 5,
    },
    {
      id: 4,
      unit: "Unit 6.4F",
      description: "Lesson about cognition and social abilities",
      teachers: 5,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedCategory === category ? "bg-yellow-400" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="p-4 border rounded-lg bg-gray-100">
            <div className="h-16 bg-green-400 mb-2"></div>
            <h3 className="font-bold">{lesson.unit}</h3>
            <p className="text-sm text-gray-600">{lesson.description}</p>
            <p className="text-xs text-gray-500">
              @AlicePalm & {lesson.teachers} teachers
            </p>
          </div>
        ))}
      </div>

      <button className="mt-4 px-4 py-2 bg-green-200 text-green-700 font-bold rounded-lg">
        Add a lesson +
      </button>
    </div>
  );
};

export default LessonsComponent;
