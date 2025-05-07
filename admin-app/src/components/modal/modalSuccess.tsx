interface ModalTs {
  onHideModal: () => void;
}

function ModalSuccess({ onHideModal }: ModalTs) {
  return (
    <div id="successModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onHideModal}>
          &times;
        </span>
        <h2>Success!</h2>
        <p>Congratulations function has been updated successfully.</p>
        <button id="confirmButton" onClick={onHideModal}>
          Agree
        </button>
      </div>
    </div>
  );
}

export default ModalSuccess;
