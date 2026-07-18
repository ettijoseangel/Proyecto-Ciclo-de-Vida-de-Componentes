import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
  // Estados del panel de control
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(1000);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Efecto de Montaje y Desmontaje (Simulacion de Vuelo)
  useEffect(() => {
    console.log("¡El panel de control está listo!"); // Montaje

    const intervaloVuelo = setInterval(() => {
      setCombustible((prevCombustible) => {
        if (prevCombustible > 0) {
          // Si hay combustible, avanzamos
          setDistancia((prevDistancia) => prevDistancia + 10);
          return prevCombustible - 5;
        } else {
          // Si nos quedamos sin combustible, detenemos el intervalo
          setEstadoNave("A la deriva (Sin combustible)");
          clearInterval(intervaloVuelo);
          return 0;
        }
      });
    }, 1000);

    // Funcion de limpieza
    return () => {
      clearInterval(intervaloVuelo);
      console.log("El panel de control se ha apagado."); // Desmontaje
    };
  }, []); //Array vacio que se ejecuta solo una vez al montar

  // Efecto de Actualizacion (Monitoreo de combustible)
  useEffect(() => {
    if (combustible < 100) {
      console.log(`¡Combustible actualizado! Nivel: ${combustible}%`);
    }
  }, [combustible]); // Se ejecuta cada vez que 'combustible' cambia

  //Variable memorizada para el estado de la nave
  const mensajeEstado = useMemo(() => {
    return `Estado de la misión: ${estadoNave}`;
  }, [estadoNave]);

  // Manejo basico para el boton de aterrizar
  const manejarAterrizaje = () => {
    if (combustible > 0) {
      setEstadoNave("Aterrizando");
      setPlanetasVisitados([...planetasVisitados, `Planeta- ${planetasVisitados.length + 1}`]);
    }
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
        disabled= {combustible === 0}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Aterrizar
      </button>

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
