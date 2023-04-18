import React, { useState } from 'react';
import styles from './popup.module.css'; // Importar el archivo de estilos CSS

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el pop-up está abierto o cerrado

  // Función para abrir el pop-up
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Función para cerrar el pop-up
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.popupContainer}>
      {/* Botón para abrir el pop-up */}
      <button onClick={handleOpen}>Abrir Pop-up</button>

      {/* Elemento de pop-up */}
      {isOpen && (
        <div className={styles.popupContent}>
          <h1>Este es un Pop-up</h1>
          <p>Contenido del Pop-up</p>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
