import React, { useState, useEffect, useRef } from "react";

function Bitacora() {
  // Inicializacion perezosa para leer el localStorage solo en el primer render
  const [planetas, setPlanetas] = useState(() => {
    const datosGuardados = localStorage.getItem("bitacoraPlanetas");
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);

  // Referencia para manipular el input del archivo directamente
  const inputImagenRef = useRef(null);

  // Sincronizar el estado con localStorage cada vez que 'planetas' cambie
  useEffect(() => {
    localStorage.setItem("bitacoraPlanetas", JSON.stringify(planetas));
  }, [planetas]);

  const manejarEnvio = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      // Si hay imagen, creamos una URL temporal para previsualizar en el navegador
      imagen: imagen ? URL.createObjectURL(image) : null,
    };

    setPlanetas([...planetas, nuevoPlaneta]);

    // Limpiar formulario
    setNombre("");
    setDescripcion("");
    setImagen(null);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = "";
    }
  };

  const manejarEliminacion = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "1.5rem",
        border: "1px solid #444",
        borderRadius: "8px",
      }}
    >
      <h2>📖 Bitácora de Exploración</h2>

      <form
        onSubmit={manejarEnvio}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />
        <textarea
          placeholder="Descripción detallada del hallazgo..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          rows="3"
          style={{ padding: "0.5rem" }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem", cursor: "pointer", fontWeight: "bold" }}
        >
          Registrar en Bitácora
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {planetas.map((planeta, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #666",
              padding: "1rem",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ marginTop: 0 }}>{planeta.nombre}</h3>
            <p>{planeta.descripcion}</p>
            {planeta.imagen && (
              <img
                src={planeta.imagen}
                alt={planeta.nombre}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  marginBottom: "1rem",
                }}
              />
            )}
            <button
              onClick={() => manejarEliminacion(index)}
              style={{
                padding: "0.3rem 0.6rem",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Eliminar Registro
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bitacora;
