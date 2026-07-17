import React, { useState, useEffect, useMemo, use } from "react";
import "./App.css";

function App() {
  // Estados del panel de control
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(1000);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  //Variable memorizada para el estado de la nave
  const mensajeEstado = useMemo(() => {
    return `Estado de la misión: ${estadoNave}`;
  }, [estadoNave]);

  // Manejo basico para el boton de aterrizar
  const manejarAterrizaje = () => {
    setEstadoNave("Aterrizando");
    // Agregamos planeta generico para probar la UI
    setPlanetasVisitados([
      ...planetasVisitados,
      `Planeta-${planetasVisitados.length - 1}`,
    ]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>🛸 Panel de Control Espacial</h1>

      <div
        style={{
          padding: "1.5rem",
          border: "1px solid #444",
          borderRadius: "8px",
          marginBottom: "1rem",
        }}
      >
        <h2>Métricas de Vuelo</h2>
        <p>
          <strong>Distancia:</strong> {distancia} años luz
        </p>
        <p>
          <strong>Combustible:</strong> {combustible}%
        </p>
        <p>
          <strong>{mensajeEstado}</strong>
        </p>
      </div>

      <button
        onClick={manejarAterrizaje}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Aterrizar
      </button>

      {/* Renderizado temporal de la lista de planetas */}
      {planetasVisitados.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Planetas Visitados:</h3>
          <ul>
            {planetasVisitados.map((planeta, index) => (
              <li key={index}>{planeta}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
