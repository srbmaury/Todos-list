import React from 'react';

const TodoStats = ({ todos }) => {
  const total = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = total - completedCount;
  const completionPercent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  // Dynamic progress bar color
  let progressColor = 'bg-primary'; // default blue
  if (completionPercent <= 30) progressColor = 'bg-danger';     // red
  else if (completionPercent <= 70) progressColor = 'bg-warning'; // yellow/orange
  else progressColor = 'bg-success';                             // green

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '15px'
      }}
    >
      {/* Stats */}
      <div style={{ fontSize: '0.85rem', minWidth: '120px', textAlign: 'right' }}>
        <div>Total: {total}</div>
        <div className="text-success">Completed: {completedCount}</div>
        <div className="text-warning">Pending: {pendingCount}</div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '150px', height: '18px', position: 'relative' }}>
        <div className="progress" style={{ height: '18px' }}>
          <div
            className={`progress-bar ${progressColor}`}
            role="progressbar"
            style={{ width: `${completionPercent}%` }}
            aria-valuenow={completionPercent}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        {/* Percentage text */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          {completionPercent}%
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
