// src/components/TaskList.js
import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filter, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <div className="no-tasks">No {filter} tasks found</div>;
  }

  return (
    <div className="task-list">
      <h2>
        {filter === 'all' && 'All Tasks'}
        {filter === 'pending' && 'Pending Tasks'}
        {filter === 'completed' && 'Completed Tasks'}
        <span> ({tasks.length})</span>
      </h2>
      
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          onUpdate={onUpdateTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;