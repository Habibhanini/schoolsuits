"use client";
import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish report",
      deadline: "Oct 20, 2024",
      professor: "John Doe",
      completed: true,
    },
    {
      id: 2,
      title: "Meeting with team",
      deadline: "Oct 21, 2024",
      professor: "John Doe",
      completed: false,
    },
    {
      id: 3,
      title: "Prepare presentation",
      deadline: "Oct 22, 2024",
      professor: "John Doe",
      completed: false,
    },
  ]);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `New Task ${tasks.length + 1}`,
      deadline: "Oct 23, 2024",
      professor: "John Doe",
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="bg-school-blue text-white p-6 rounded-3xl  w-full max-w-lg h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-playfair">To-Do</h2>

        <div className="flex items-center space-x-4">
          <p className="text-white font-bold font-jakarta">
            Completed {completedCount}/{tasks.length}
          </p>

          <button
            onClick={addTask}
            className="bg-white text-black rounded-md py-1 px-4 text-sm font-bold hover:bg-gray-200 font-jakarta"
          >
            Add a Task
          </button>
        </div>
      </div>

      {/* Tasks List with fixed height and scrollable */}
      <div className="space-y-4 max-h-[300px] overflow-y-auto scrollable pr-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#3047BA] border-b-[1px] text-white  flex items-start justify-between font-jakarta"
          >
            <div>
              <h3 className="font-bold mb-4">{task.title}</h3>
              <p className="text-sm text-gray-300 font-jakarta">
                Deadline: {task.deadline} - {task.professor}
              </p>
            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="ml-4 mt-4 w-6 h-6 appearance-none border cursor-pointer border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:border-indigo-500 checked:bg-white relative checked:after:content-[''] checked:after:absolute checked:after:top-[4px] checked:after:left-[7px] checked:after:w-[8px] checked:after:h-[12px] checked:after:border-r-4 checked:after:border-b-4 checked:after:border-blue-500 checked:after:rotate-45"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
