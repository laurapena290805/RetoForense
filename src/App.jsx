import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProgressTracker from './components/ProgressTracker';
import Map from './components/Map';
import './App.css';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showContextModal, setShowContextModal] = useState(true);
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      name: "Acceso a la Máquina",
      correctFlag: "QADPYEP",
      description: "Descifra las credenciales para ingresar a la máquina virtual.",
      status: "unlocked",
      completed: false,
      folderHint: {
        riddle: "No soy tu directorio home, pero estoy cerca.\nBusca donde los programas se instalan.\nEmpieza con 'Prog' y termina con '86'"
      },
      challengeHint: "Usuario: FORENSE\nContraseña: El usuario, pero cifrado con César+12."
    },
    {
      id: 2,
      name: "Secuencia Numérica",
      correctFlag: "3901N437D9",
      description: "Descifra el patrón y encuentra el siguiente número.",
      status: "locked",
      completed: false,
      folderHint: {
        riddle: "En el escritorio me encontrarás"
      },
      challengeHint: "Observa la secuencia:\n1\n1 1\n2 1\n1 2 1 1\nIdentifica el patrón."
    },
    {
      id: 3,
      name: "Metadatos Ocultos",
      correctFlag: "El caracol",
      description: "Extrae las coordenadas y encuentra el lugar.",
      status: "locked",
      completed: false,
      folderHint: {
        riddle: "Como el animal que soy,\n\nmi carpeta está en Temp, sin ser un desecho.\nBusca entre los logs mi hogar,\nmi nombre es un eco de lo que ya he dicho."
      },
      challengeHint: "Usa exiftool o revisa las propiedades de la imagen para hallar una ubicación específica. Dentro de un cartel en ese lugar, encontrarás la bandera."
    },
    {
      id: 4,
      name: "Tráfico de Red",
      correctFlag: "123retoUnivalle-2025",
      description: "Analiza la captura y encuentra la bandera.",
      status: "locked",
      completed: false,
      folderHint: {
        riddle: "En la raiz estoy, escondida pero presente, la vista deberás cambiar para poderme encontrar."
      },
      challengeHint: "La clave se encuentra en el servidor.\nPrimero, localiza el servidor, y luego podrás encontrar la clave."
    },
    {
      id: 5,
      name: "Código Morse Final",
      correctFlag: "C25IG",
      description: "Descifra el mensaje en morse para desactivar la bomba.",
      status: "locked",
      completed: false,
      folderHint: {
        riddle: "El final está cerca, busca en la carpeta 'Morse' dentro de Documentos."
      },
      challengeHint: "En este desafío, cada detalle cuenta, y la clave podría estar más cerca de lo que imaginas. Observa tu entorno con atención: los colores también hablan. Fíjate en las líneas azul oscuro ⚪ y los puntos blancos.\n¿Parece simple? Quizás sí, pero no subestimes lo que te rodea. Lo importante no siempre está a primera vista. Inspecciona cada rincón de la imagen: lo visible, lo sutil, lo repetitivo o lo que parece insignificante. A veces, el mensaje se esconde justo detrás de lo evidente."
    }
  ]);

  // Verificar si todos los retos están completados
  useEffect(() => {
    const allCompleted = challenges.every(challenge => challenge.completed);
    if (allCompleted) {
      setShowWinnerModal(true);
    }
  }, [challenges]);

  const closeContextModal = () => {
    setShowContextModal(false);
  };

  const handleComplete = (id) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id) {
        return { ...challenge, completed: true, status: "completed" };
      }
      if (challenge.id === id + 1) {
        return { ...challenge, status: "unlocked" };
      }
      return challenge;
    }));
  };

  const closeWinnerModal = () => {
    setShowWinnerModal(false);
  };

  const resetChallenges = () => {
    setChallenges(challenges.map(challenge => ({
      ...challenge,
      completed: false,
      status: challenge.id === 1 ? "unlocked" : "locked"
    })));
    setShowWinnerModal(false);
  };

  // Función para obtener el nombre del siguiente reto
  const getChallengeWithNextName = (challenge) => ({
    ...challenge,
    folderHint: {
      ...challenge.folderHint,
      nextChallengeName: challenge.id === 5 ? "¡Final!" : challenges.find(c => c.id === challenge.id + 1)?.name
    }
  });

  return (
    <div className="ctf-app">
      <button
        className="menu-button"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰ Menú
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="ctf-container">
        <h1 className="ctf-title">⚔️ Tictac Hack</h1>
        <ProgressTracker challenges={challenges} />

        <div className="ctf-map">
          <Map
            challenges={challenges.map(getChallengeWithNextName)}
            onComplete={handleComplete}
          />
        </div>
      </div>

      {/* Modal de contexto inicial */}
      {showContextModal && (
        <div className="context-modal-overlay">
          <div className="context-modal-backdrop"></div>
          <div className="context-modal-content">
            <h2 className="context-modal-title">🚨 Misión Crítica: Desactivar la Bomba</h2>

            <div className="context-modal-body">
              <p>
                Un informante anónimo ha filtrado información preocupante: un artefacto virtual, conocido como <strong>“la Bomba Lógica”</strong>, ha sido insertado en una máquina virtual crítica de la organización. Esta bomba no explota físicamente… pero si se activa, <strong>corromperá archivos, borrará evidencias y bloqueará el sistema de forma irreversible.</strong>
              </p>
              <p>
                <strong>El tiempo corre.</strong> Los desarrolladores detrás del ataque dejaron una secuencia de pruebas como burla para quienes intenten detenerla. La única forma de desactivarla es <strong>siguiendo las pistas correctamente, una por una, sin saltarse pasos.</strong> Cualquier error o intento de forzar el sistema puede <strong>activar mecanismos falsos</strong> que aceleran el contador.
              </p>
              <hr />
              <p>
                <strong>¿Lograrás descifrar el misterio y evitar el desastre digital?</strong>
              </p>
            </div>

            <div className="context-modal-buttons">
              <button
                className="context-modal-button primary"
                onClick={closeContextModal}
              >
                Aceptar Misión
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal de ganador */}
{showWinnerModal && (
  <div className="winner-modal-overlay">
    <div className="winner-modal-backdrop"></div>
    <div className="winner-modal-content">
      <h2 className="winner-title">🎉 ¡Misión cumplida, agente! 🎉</h2>

      <div className="winner-message">
        <p>Has logrado superar cada desafío, descifrar cada pista y burlar todos los mecanismos de seguridad.</p>
        <p><strong>La bomba lógica ha sido desactivada exitosamente.</strong></p>
        <p>¡Gracias a ti, el sistema está a salvo!</p>
      </div>
      <div className="winner-prize-info">
        <p className="winner-highlight">🏆 Si estás entre los primeros en completar el reto, recibirás un premio especial. .</p>
      </div>

      <div className="winner-buttons">
        <button
          className="winner-button"
          onClick={closeWinnerModal}
        >
          Cerrar
        </button>
        <button
          className="winner-button secondary"
          onClick={resetChallenges}
        >
          Reiniciar Retos
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}