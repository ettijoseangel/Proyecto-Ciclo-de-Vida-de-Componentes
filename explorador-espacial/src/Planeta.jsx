import React, { useEffect } from 'react';

function Planeta ({ nombre }) {
    useEffect(() => {
        //Se ejecuta cuando el componente se renderiza por primera vez
        console.log(`¡El planeta ${nombre} ha aparecido!`);

        // La funcion de retorno se ejecuta cuando el componente es destruido/removido
        return () => {
            console.log(`¡El planeta ${nombre} ha desaparecido!`);
        }
    }, [nombre])

    return (
        <li style={{ padding: '0.5rem 0', fontSize: '1.1rem' }}>
            🪐 {nombre}
        </li>
    );
}

export default Planeta;
