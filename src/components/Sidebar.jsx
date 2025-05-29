import React, { useState } from "react";
import "./Sidebar.css";
// Importa tus imágenes (asegúrate de tenerlas en tu proyecto)
import murcielagoImage from '../assets/murcielago-code.jpeg';
import cesarImage from '../assets/cesar-codigo.png';
import morseImage from '../assets/morse.png';

export default function Sidebar({ isOpen, onClose }) {
  const [activeHelp, setActiveHelp] = useState(null);

  if (!isOpen) return null;

  const helpContents = {
    murcielago: {
      title: "🔍 Código Murciélago",
      content: (
        <div className="help-content">
          <h4>Instrucciones para decodificar:</h4>
          <p>El código murciélago reemplaza números por letras:</p>
          <img 
            src={murcielagoImage} 
            alt="Tabla de código murciélago"
            className="help-image"
          />
          <p className="help-example">Ejemplo: "123" se convierte en "URC"</p>
        </div>
      )
    },
    cesar: {
      title: "🏆 Cifrado César +12",
      content: (
        <div className="help-content">
          <h4>Cómo descifrar:</h4>
          <img 
            src={cesarImage} 
            alt="Ejemplo de cifrado César"
            className="help-image"
          />
        </div>
      )
    },
    morse: {
      title: "🛠️ Código Morse",
      content: (
        <div className="help-content">
          <h4>Guía rápida de Morse:</h4>
          <img 
            src={morseImage} 
            alt="Alfabeto morse completo"
            className="help-image"
          />
        </div>
      )
    }
  };

  const handleHelpClick = (helpKey) => {
    setActiveHelp(helpKey);
  };

  const closeHelp = () => {
    setActiveHelp(null);
  };

  return (
    <div className="sidebar-overlay">
      <div className="sidebar-backdrop" onClick={onClose}></div>
      <div className="sidebar-content">
        <button className="sidebar-close" onClick={onClose}>
          ✖
        </button>
        <h2 className="sidebar-title">📋 Menú del CTF</h2>
        
        <div className="sidebar-section">
          <h3 className="sidebar-section-title">Ayuda en Retos</h3>
          <ul className="sidebar-menu">
            <li 
              className="sidebar-menu-item"
              onClick={() => handleHelpClick('murcielago')}
            >
              🔍 Código murciélago
            </li>
            <li 
              className="sidebar-menu-item"
              onClick={() => handleHelpClick('cesar')}
            >
              🏆 César +12
            </li>
            <li 
              className="sidebar-menu-item"
              onClick={() => handleHelpClick('morse')}
            >
              🛠️ Código morse
            </li>
          </ul>
        </div>       
        <div className="sidebar-footer">
          <p>CTF Challenge v1.0</p>
        </div>
      </div>

      {/* Modal de ayuda con imágenes */}
      {activeHelp && (
        <div className="help-modal-overlay">
          <div className="help-modal-backdrop" onClick={closeHelp}></div>
          <div className="help-modal-content">
            <button className="help-modal-close" onClick={closeHelp}>
              ✖
            </button>
            <h3 className="help-modal-title">{helpContents[activeHelp].title}</h3>
            <div className="help-modal-body">
              {helpContents[activeHelp].content}
            </div>
            <button 
              className="help-modal-ok-button"
              onClick={closeHelp}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}