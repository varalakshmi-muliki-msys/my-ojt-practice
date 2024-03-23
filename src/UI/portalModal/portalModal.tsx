import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import "./portalModal.scss";
import { portalModalTypes } from "../../common/component-types";

export const PortalModal = ({
  showModal,
  setShowModal,
  modalText,
}: portalModalTypes) => {
  return (
    <>
      {showModal &&
        createPortal(
          <div className="modal-container">
            <div className="modal-content">
              <p>{modalText}</p>
              <button className="close-button" onClick={() => setShowModal(false)}>OK</button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
PortalModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.bool,
  modaltext: PropTypes.string,
};
