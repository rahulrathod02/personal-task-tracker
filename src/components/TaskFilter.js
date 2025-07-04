// src/components/TaskFilter.js
import React from 'react';

const TaskFilter = ({ currentFilter, onFilterChange, counts }) => {
  return (
    <div className="task-filter">
      <button 
        onClick={() => onFilterChange('all')} 
        className={currentFilter === 'all' ? 'active' : ''}
      >
        All ({counts.all})
      </button>
      
      <button 
        onClick={() => onFilterChange('pending')} 
        className={currentFilter === 'pending' ? 'active' : ''}
      >
        Pending ({counts.pending})
      </button>
      
      <button 
        onClick={() => onFilterChange('completed')} 
        className={currentFilter === 'completed' ? 'active' : ''}
      >
        Completed ({counts.completed})
      </button>
    </div>
  );
};

export default TaskFilter;