"use client";
import React, { useState } from "react";

const TodoCard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Finish report",
      deadline: "Oct 20, 2024",
      completed: true,
    },
    {
      id: 2,
      title: "Meeting with team",
      deadline: "Oct 21, 2024",
      completed: false,
    },
    {
      id: 3,
      title: "Prepare presentation",
      deadline: "Oct 22, 2024",
      completed: false,
    },
  ]);

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: `New Task ${tasks.length + 1}`,
      deadline: "Oct 23, 2024",
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
    <div className="bg-[#3047BA] text-white p-6 rounded-3xl shadow-lg w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        {/* TO-DO Title */}
        <h2 className="text-xl font-bold">TO-DO</h2>

        {/* Add Task Button */}
        <button
          onClick={addTask}
          className="bg-white text-[#3047BA] rounded-md py-1 px-4 text-sm font-bold hover:bg-gray-200"
        >
          Add Task
        </button>
      </div>

      {/* Completed Tasks */}
      <p className="text-gray-200 mb-4">
        Completed {completedCount}/{tasks.length}
      </p>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white text-[#3047BA] p-4 rounded-md flex items-start justify-between"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="ml-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoCard;
