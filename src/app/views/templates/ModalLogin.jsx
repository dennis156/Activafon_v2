"use client";

import "../../assets/css/modal.css";

export default function ErrorModalLogin({ onClose }) {
  return (
    <div id="modal-overlay">
      <div id="modal">
        <h2>Parece que ha ocurrido un error</h2>
        <p>Las credenciales son incorrectas</p>
        <button id="close-modal-btn" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
