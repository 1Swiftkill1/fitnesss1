import React, { useState } from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = (e) => {
    if (e.target.id === "modal") {
      onClose();
    }
  };
  return (
    <>
      {isOpen && (
        <div
          id="modal"
          onClick={(e) => handleClose(e)}
          className="modal-overlay"
        >
          <div className="modal">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
