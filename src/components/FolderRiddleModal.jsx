import React from 'react';
import './FolderRiddleModal.css';

export default function FolderRiddleModal({ 
  riddle, 
  onSolved,
  onClose,
  nextChallengeName 
}) {
  const handleContinue = () => {
    onSolved();
  };

  return (
    <div className="folder-modal-overlay">
      <div className="folder-modal-backdrop" onClick={onClose}></div>
      <div className="folder-modal-content">
        <button className="folder-modal-close" onClick={onClose}>
          ✖
        </button>
        <h3 className="folder-modal-title">📍 Ubicación del Reto: {nextChallengeName}</h3>
        <p className="folder-modal-instructions">
          Encuentra la siguiente carpeta con estas pistas:
        </p>
        
        <div className="folder-riddle-box">
          <pre className="folder-riddle-text">{riddle}</pre>
        </div>

        <div className="folder-buttons">
          <button 
            className="folder-submit"
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>

        <div className="folder-tip">
          <p>💡 Busca cuidadosamente en el sistema de archivos</p>
        </div>
      </div>
    </div>
  );
}