import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDeleteTask, onUpdateTask, searchTerm }) => {
  
  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => 
    (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort tasks by due date
  const sortedTasks = filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className="task-list">
      {sortedTasks.length === 0 ? (
        <p className="text-center">No tasks available.</p>
      ) : (
        sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
