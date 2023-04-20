import React, { useState } from 'react';
import styles from './popup.module.css'; // Importar el archivo de estilos CSS
import arrow from "../../../public/down-arrow.png";
import Image from "next/image";

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
    <div className={styles.container}>
      {/* Botón para abrir el pop-up */}
      <Image onClick={handleOpen} height={15} width={15} alt="Desplegar" src={arrow}></Image>
      {/* Elemento de pop-up */}
      {isOpen && (
        <div className={styles.popupContent}>
          <h1>Ejemplo de popup</h1>
          <p>Este es un simple ejemplo de como se veria el encargo abierto para poder leer la descripción</p>
          <button onClick={handleClose}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
