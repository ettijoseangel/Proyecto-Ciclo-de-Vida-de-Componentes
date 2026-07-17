# Proyecto de Ciclo de vida de Componentes - Módulo 6: Introducción a React

> Comprender el ciclo de vida de los componentes funcionales en React es fundamental para desarrollar aplicaciones robustas y eficientes. Al utilizar los hooks como useEffect, podemos simular las etapas clave del ciclo de vida y realizar acciones específicas en cada etapa.

---

## 🔴 Objetivo del proyecto

En este proyecto practicarás el uso de algunos hooks de React (`useState`, `useEffect`, `useMemo`) para:

1. Gestionar el estado.
2. Ejecutar efectos secundarios (simulando el vuelo).
3. Optimizar cálculos con `useMemo`.
4. Comprender el ciclo de vida: montaje, actualización y desmontaje.

---

## Taller: El Viaje del Explorador Espacial

Imagina que eres un explorador espacial que construye un panel de control para tu nave. Este panel muestra información crucial del viaje: distancia, combustible, estado de la nave y planetas visitados. ¡Pero esta vez, te enfocarás en entender el ciclo de vida de tus componentes!

---

## Instrucciones para workshop/taller:

1.  **Preparación del Entorno (con Vite):**

    *   Asegúrate de tener Node.js y npm (o yarn) instalados.
    *   Crea un proyecto Vite:

    ```bash
    npm init vite@latest explorador-espacial --template react
    cd explorador-espacial
    npm install
    ```

2.  **Componente Principal ("Panel de Control"):**

    *   Crea/modifica `src/App.jsx` (o el componente principal).

    *   Importa los hooks:

    ```javascript
    import React, { useState, useEffect, useMemo } from 'react';
    ```

    *   **Estado:**
        *   `distancia`: Distancia (0).
        *   `combustible`: Combustible (100).
        *   `estadoNave`: Estado ("En órbita").
        *   `planetasVisitados`: Array vacío.

    *   **Efectos Secundarios (`useEffect`):**
        *   **Montaje:**
            *   Muestra un mensaje en la consola: "¡El panel de control está listo!"
            *   Simula el vuelo: Cada segundo, reduce combustible y aumenta distancia.
        *   **Actualización:**
            *   Si `combustible` cambia, muestra un mensaje: "¡Combustible actualizado!"
        *   **Desmontaje:**
            *   Limpia el intervalo de vuelo.
            *   Muestra un mensaje: "El panel de control se ha apagado."

    *   **Cálculo con `useMemo`:**
        *   Crea una variable `mensajeEstado` con `useMemo`. Este mensaje depende de `estadoNave` y se memoiza para evitar recalcularlo innecesariamente.

    *   **Interfaz de Usuario:**
        *   Muestra distancia, combustible, estado (usando `mensajeEstado`).
        *   Botón "Aterrizar":
            *   Cambia estado a "Aterrizando".
            *   Añade planeta a `planetasVisitados`.

3.  **Componente de Planeta (Opcional):**

    *   Crea `src/Planeta.jsx`. Recibe `nombre` como prop.

    *   **Ciclo de Vida:**
        *   **Montaje:** Muestra mensaje: "¡El planeta {nombre} ha aparecido!"
        *   **Desmontaje:** Muestra mensaje: "¡El planeta {nombre} ha desaparecido!"

4.  **Uso de `Planeta.jsx` en `App.jsx`:**

    *   Importa `Planeta` en `App.jsx`.

    *   Renderiza una lista de componentes `Planeta` usando `planetasVisitados`.

### Ejecución y Resultado

1.  Inicia el desarrollo:

    ```bash
    npm run dev
    ```

2.  Observa la consola del navegador:
    *   Verás los mensajes de montaje y desmontaje del panel.
    *   Verás mensajes de actualización al cambiar el combustible.
    *   Al "Aterrizar", verás mensajes de montaje y desmontaje de los componentes `Planeta`.

### Ejemplo de Código (Fragmento)

```javascript
// App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';

function App() {
  // ... (estado)

  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      // ... (simulación de vuelo)
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!"); // Actualización
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  return (
    <div>
      {/* ... (información del panel) */}
      {planetasVisitados.map((planeta, index) => (
        <Planeta key={index} nombre={planeta} />
      ))}
    </div>
  );
}

// Planeta.jsx
import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`); // Montaje

    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`); // Desmontaje
    };
  }, []);

  return <div>{nombre}</div>;
}
```

¡Este workshop te dará una visión más profunda del ciclo de vida de los componentes y cómo usar los hooks para gestionarlo!


## Reto Final: "Bitácora de Exploración"

### Descripción del Reto

Elabora una "Bitácora de Exploración" interactiva donde el usuario pueda registrar los planetas visitados, añadirles descripciones detalladas e incluso adjuntar imágenes.

### Funcionalidades Adicionales

1.  **Formulario de Registro:**

    *   Crea un formulario donde el usuario pueda ingresar el nombre del planeta, una descripción y cargar una imagen (opcional).

2.  **Almacenamiento de Datos:**

    *   Utiliza `localStorage` para guardar la información de los planetas registrados. Esto permitirá que los datos persistan incluso si se recarga la página.

3.  **Visualización de la Bitácora:**

    *   Muestra una lista de los planetas registrados en la bitácora.
    *   Al hacer clic en un planeta, se debe mostrar su descripción detallada e imagen (si fue adjuntada).

4.  **Edición y Eliminación:**

    *   Agrega botones para editar la información de un planeta existente o eliminarlo de la bitácora.

### Pistas

*   Puedes usar un hook adicional como `useRef` para manejar la referencia al formulario.
*   Investiga cómo funciona `localStorage` en JavaScript para guardar y recuperar datos.
*   Considera usar una librería de componentes UI (como Material UI, Ant Design, etc.) para agilizar el diseño del formulario y la lista de planetas.

### Ejemplo de Estructura de Datos en `localStorage`

```json
{
  "planetas": [
    {
      "nombre": "Planeta X",
      "descripcion": "Un planeta rocoso con atmósfera tenue.",
      "imagen": "url_de_la_imagen.jpg"
    },
    {
      "nombre": "Planeta Y",
      "descripcion": "Un gigante gaseoso con anillos brillantes.",
      "imagen": null
    }
  ]
}
```
### Posible solución del reto adicional

```jsx
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
    };

    setPlanetas([...planetas, nuevoPlaneta]);
    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = ''; // Limpiar el input de imagen
    }
  };

  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
  };

  return (
    <div>
      <h1>Bitácora de Exploración</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button type="submit">Guardar</button>
      </form>

      <h2>Planetas Registrados</h2>
      <ul>
        {planetas.map((planeta, index) => (
          <li key={index}>
            <h3>{planeta.nombre}</h3>
            <p>{planeta.descripcion}</p>
            {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}
            <button onClick={() => handleDelete(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### Explicación del Código

1.  **Estados:**
    *   `planetas`: Almacena la lista de planetas (inicialmente recuperada de `localStorage` o un array vacío).
    *   `nombre`, `descripcion`, `imagen`: Almacenan los datos del formulario.

2.  **`useEffect` para `localStorage`:**
    *   Este efecto se ejecuta cada vez que `planetas` cambia y guarda la lista actualizada en `localStorage`.

3.  **`handleSubmit`:**
    *   Previene la recarga de la página al enviar el formulario.
    *   Crea un objeto `nuevoPlaneta` con los datos del formulario y la URL de la imagen (si se cargó).
    *   Actualiza el estado `planetas` con el nuevo planeta.
    *   Limpia el formulario.
    *   Limpia el input de imagen usando una referencia (`useRef`).

4.  **`handleDelete`:**
    *   Crea una copia del array `planetas`.
    *   Elimina el planeta en el índice especificado.
    *   Actualiza el estado `planetas` con el array modificado.

5.  **JSX:**
    *   Muestra el formulario para registrar planetas.
    *   Muestra la lista de planetas registrados, incluyendo su descripción e imagen (si existe).
    *   Incluye un botón para eliminar cada planeta.

### Mejoras y Consideraciones Adicionales

*   **Edición de Planetas:** Puedes agregar funcionalidad para editar la información de un planeta existente.
*   **Validación del Formulario:** Sería útil validar los datos del formulario antes de guardarlos.
*   **Manejo de Errores:** Considera agregar manejo de errores para la carga de imágenes y otras posibles situaciones.
*   **Estilos:** Agrega estilos CSS para mejorar la presentación de la bitácora.
*   **Librería de Componentes UI:** Si lo deseas, puedes integrar una librería como Material UI o Ant Design para agilizar el desarrollo de la interfaz.

Este código te proporciona una base sólida para implementar la "Bitácora de Exploración". ¡Recuerda adaptarlo y mejorarlo según tus necesidades y creatividad!