import React, { useState, useEffect } from 'react';
import './ChallengeNode.css';
import FolderRiddleModal from './FolderRiddleModal.jsx';

export default function ChallengeNode({
  name,
  description,
  correctFlag,
  status,
  onComplete,
  folderHint,
  challengeHint,
  allChallengesCompleted
}) {
  const [input, setInput] = useState("");
  const [showHintModal, setShowHintModal] = useState(false);
  const [error, setError] = useState(null);
  const [buttonState, setButtonState] = useState("idle");
  const [showWinner, setShowWinner] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [currentStep, setCurrentStep] = useState('flag'); // 'flag' -> 'folder' -> 'completed'

  // ChallengeNode.jsx
// Cambia el useEffect para manejar el estado de showWinner
useEffect(() => {
  if (allChallengesCompleted) {
    setShowWinner(true);
  }
}, [allChallengesCompleted]);

// Modifica la función handleFlagSubmit para el último reto
const handleFlagSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setButtonState("loading");

  await new Promise(resolve => setTimeout(resolve, 800));

  const userFlag = normalizeFlag(input);
  const expectedFlag = normalizeFlag(correctFlag);

  if (userFlag === expectedFlag) {
    setButtonState("success");
    setTimeout(() => {
      if (name === "Código Morse Final") {
        onComplete(); // Marca como completado
        setShowWinner(true); // Muestra el modal de ganador
      } else {
        setCurrentStep('folder');
        setShowFolderModal(true);
      }
      setButtonState("idle");
    }, 1000);
  } else {
    setButtonState("error");
    setError(`Bandera incorrecta. Sigue intentando.`);
    setTimeout(() => setButtonState("idle"), 1000);
  }
};  

  const handleTitleClick = () => {
    if (status === 'completed') {
      setShowFolderModal(true);
    }
  };

  const normalizeFlag = (flag) => {
    return flag.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  

  const handleFolderSolved = () => {
    setShowFolderModal(false);
    onComplete(); // Marca el reto como completado
  };

  return (
    <div className={`challenge-node ${status}`}>
      <div className="challenge-header">
        <div className="challenge-status-icon">
          {status === 'completed' ? '✅' : status === 'unlocked' ? '🔓' : '🔒'}
        </div>
        <h3
          className="challenge-title"
          onClick={handleTitleClick}
          style={{ cursor: status === 'completed' ? 'pointer' : 'default' }}
        >
          {name}
        </h3>
        {status === 'completed' && (
          <span className="completed-badge">Completado</span>
        )}
      </div>

      <p className="challenge-description">{description}</p>

      {status !== "locked" ? (
        <form onSubmit={handleFlagSubmit} className="challenge-form">
          <div className="input-group">
            <input
              className="challenge-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Introduce la bandera (CTF{...})"
              disabled={buttonState === "loading" || status === 'completed'}
            />
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span> {error}
              </div>
            )}
          </div>

          <div className="button-group">
            <button
              className={`challenge-button ${buttonState}`}
              type="submit"
              disabled={buttonState !== "idle" || status === 'completed'}
            >
              {buttonState === "loading" ? (
                <span className="button-loader"></span>
              ) : (
                "Validar Bandera"
              )}
            </button>

            <button
              type="button"
              className="hint-button"
              onClick={() => setShowHintModal(true)}
              disabled={buttonState === "loading"}
            >
              Mostrar pista
            </button>
          </div>
        </form>
      ) : (
        <div className="locked-container">
          <p className="locked-message">
            <span className="locked-icon">🔐</span> Completa el reto anterior para desbloquear este
          </p>
        </div>
      )}

      {/* Modal de pista del reto */}
      {showHintModal && (
        <div className="hint-modal-overlay">
          <div className="hint-modal-backdrop" onClick={() => setShowHintModal(false)}></div>
          <div className="hint-modal-content">
            <button
              className="hint-modal-close"
              onClick={() => setShowHintModal(false)}
            >
              ✖
            </button>
            <h3 className="hint-modal-title">💡 Pista para: {name}</h3>
            <div className="hint-modal-body">
              {challengeHint ? (
                challengeHint.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))
              ) : (
                <div className="default-hint">
                  <p>Formato esperado: CTF{"{texto_con_underscores}"}</p>
                  <p>Ejemplo: CTF{"{mi_bandera}"}</p>
                </div>
              )}
            </div>

            <button
              className="hint-modal-close-button"
              onClick={() => setShowHintModal(false)}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de acertijo de carpeta */}
      {showFolderModal && (
        <FolderRiddleModal
          riddle={folderHint.riddle}
          solution={folderHint.solution}
          onSolved={handleFolderSolved}
          challengeName={name}
          onClose={() => setShowFolderModal(false)}
        />
      )}

      {/* Modal de ganador */}
      {showWinner && (
        <div className="winner-modal-overlay">
          <div className="winner-modal-backdrop" onClick={() => setShowWinner(false)}></div>
          <div className="winner-modal-content">
            <h2 className="winner-title">¡Felicidades! 🎉</h2>
            <p className="winner-message">Has completado todos los retos del CTF con éxito.</p>
            <p className="winner-message">La bomba ha sido desactivada.</p>
            <div className="winner-details">
            </div>
            <button
              className="winner-button"
              onClick={() => setShowWinner(false)}
            >
              ¡Celebrar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}