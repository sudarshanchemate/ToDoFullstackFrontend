import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tasks");
        console.log("Fetched tasks from backend:", response.data); // Log the fetched tasks
        setTasks(response.data); // Update the tasks state with the response data
      } catch (error) {
        console.error("Error fetching tasks from backend:", error);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`); // Assuming you have a DELETE endpoint
      console.log("Deleted task with ID:", id); // Log the deleted task ID
      setTasks(tasks.filter((task) => task.id !== id)); // Update local state after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      console.log("Updating task:", updatedTask); // Log the updated task data
      const response = await axios.put(`http://localhost:8080/tasks/${updatedTask.id}`, updatedTask); // Assuming you have a PUT endpoint
      console.log("Response after updating task:", response.data); // Log the response data
      setTasks(tasks.map((task) => (task.id === response.data.id ? response.data : task))); // Update local state with the response
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      <TaskForm/>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} searchTerm={searchTerm} />
    </div>
  );
};

export default App;
