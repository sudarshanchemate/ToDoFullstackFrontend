import React, { useState } from "react";
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: 1,
    status: "In Progress",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedTask = {
      ...task,
      dueDate: new Date(task.dueDate).toISOString().split("T")[0],
    };
  
    console.log("Sending Task Data:", formattedTask);
  
    try {
      await axios.post("http://localhost:8080/AddTasks", formattedTask); // Use formattedTask
      onAddTask(formattedTask); // Pass the formatted task back
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: 1,
        status: "In Progress",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  

  return (
    <form className="task-form mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={task.title}
        onChange={handleInputChange}
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleInputChange}
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleInputChange}
        className="w-full mb-4 px-4 py-2 border rounded-md"
        required
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleInputChange}
        className="w-full mb-4 px-4 py-2 border rounded-md"
      >
        <option value={1}>High</option>
        <option value={2}>Medium</option>
        <option value={3}>Low</option>
      </select>
      <select
        name="status"
        value={task.status}
        onChange={handleInputChange}
        className="w-full mb-4 px-4 py-2 border rounded-md"
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
