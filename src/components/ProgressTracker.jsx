import React from 'react';
import './ProgressTracker.css';

function ProgressTracker({ challenges }) {
  const total = challenges.length;
  const completed = challenges.filter(c => c.completed).length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h2>Progreso del CTF</h2>
        <div className="progress-stats">
          <span className="completed-count">{completed}</span>
          <span className="total-count">/{total} retos</span>
          <span className="percentage">({percentage}%)</span>
        </div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-animation"></div>
        </div>
      </div>
      <div className="progress-labels">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}

export default ProgressTracker;