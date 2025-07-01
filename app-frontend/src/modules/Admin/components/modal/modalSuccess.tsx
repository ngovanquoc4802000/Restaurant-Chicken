interface ModalTs {
  onHideModal: () => void;
}

function ModalSuccess({ onHideModal }: ModalTs) {
  return (
    <div id="successModal  bg-black/50 fixed z-[1] left-0 right-0 w-full h-full overflow-auto " className="modal">
      <div className="modal-content mt-[15%] mb-[15%] mx-auto bg-[#fefefe] p-5 border border-solid border-gray-400 w-[80%] max-[500px] rounded-[10px] text-center ">
        <span
          className="close hover:no-underline focus:no-underline hover:text-black focus:text-gray-950 focus:cursor-pointer cursor-pointer  text-gray-500 float-right text-[28px] font-bold"
          onClick={onHideModal}
        >
          &times;
        </span>
        <h2>Success!</h2>
        <p>Congratulations function has been updated successfully.</p>
        <button
          id="confirmButton hover:bg-[##45a049] bg-green-500 text-white px-[10px] py-[20px] border-none rounded-[4px] cursor-pointer "
          onClick={onHideModal}
        >
          Agree
        </button>
      </div>
    </div>
  );
}

export default ModalSuccess;
