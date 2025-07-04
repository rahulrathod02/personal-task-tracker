import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

const Dashboard = ({ username, onLogout }) => {
  // Sample tasks from the PDF
  const sampleTasks = [
    {
      id: 1,
      title: "Complete React assignment",
      description: "Build a task tracker application",
      completed: false,
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Review JavaScript concepts",
      description: "Go through ES6+ features",
      completed: true,
      createdAt: "2024-01-14T15:30:00Z"
    }
  ];

  // Initialize tasks with sample data if localStorage is empty
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : sampleTasks;
  });
  
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks based on current selection
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Calculate counts for filter tabs
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="dashboard">
      <header>
        <h1>Personal Task Tracker</h1>
        <div className="user-info">
          <span>Welcome back, {username}!</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`add-task-btn ${showForm ? 'active' : ''}`}
        >
          {showForm ? 'Cancel' : 'Add New Task'}
        </button>

        {showForm && <TaskForm onAddTask={addTask} />}

        <TaskFilter 
          currentFilter={filter}
          onFilterChange={setFilter}
          counts={{ 
            all: tasks.length, 
            pending: pendingCount, 
            completed: completedCount 
          }}
        />

        <TaskList 
          tasks={filteredTasks} 
          filter={filter}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </main>
    </div>
  );
};

export default Dashboard;