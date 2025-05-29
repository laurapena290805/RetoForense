import React, { useState } from 'react';
import './FolderRiddle.css';

export default function FolderRiddle({ 
  riddle, 
  solution, 
  onSolved,
  challengeName 
}) {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === solution.toLowerCase()) {
      onSolved();
    } else {
      setError("Ruta incorrecta. Sigue intentando.");
      setTimeout(() => setError(null), 2000);
    }
  };

  return (
    <div className="folder-riddle-container">
      <div className="folder-riddle-header">
        <h3>🔍 Ubicación del Reto: {challengeName}</h3>
        <p className="folder-instructions">
          Resuelve este acertijo para encontrar la carpeta en el sistema:
        </p>
      </div>
      
      <div className="riddle-box">
        <pre className="riddle-text">{riddle}</pre>
      </div>

      <form onSubmit={handleSubmit} className="folder-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Introduce la ruta completa de la carpeta..."
          className="folder-input"
        />
        {error && <div className="folder-error">{error}</div>}
        <button type="submit" className="folder-submit">
          Validar Ruta
        </button>
      </form>

      <div className="folder-tip">
        <p>💡 Tip: Usa rutas absolutas (ej: C:\Carpeta\Subcarpeta)</p>
      </div>
    </div>
  );
}