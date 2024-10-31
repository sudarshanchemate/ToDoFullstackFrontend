import React from "react";

const TaskItem = ({ task, onDeleteTask, onUpdateTask }) => {
  const { id, title, description, dueDate, priority, status } = task;

  const handleDelete = () => {
    onDeleteTask(id);
  };

  const handleUpdate = () => {
    const updatedTask = {
      ...task,
      status: status === "In Progress" ? "Completed" : "In Progress",
    };
    onUpdateTask(updatedTask);
  };

  return (
    <div className="task-item mb-4 p-4 border rounded-md bg-white shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <p className="text-gray-500">
        Due: {new Date(dueDate).toLocaleDateString()} | Priority:{" "}
        {priority === 1 ? "High" : priority === 2 ? "Medium" : "Low"}
      </p>
      <p className="text-sm">
        Status:{" "}
        <span
          className={`${
            status === "Completed" ? "text-green-500" : "text-yellow-500"
          } font-semibold`}
        >
          {status}
        </span>
      </p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
        >
          {status === "In Progress" ? "Mark Completed" : "Mark In Progress"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
