import type Image from "../../types/dishlist";
interface detailImageTs {
  item: Image[];
  onHideModal: () => void;
}

function DetailById({ item, onHideModal }: detailImageTs) {
  return (
    <div className="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-gray-600 flex justify-center items-center">
      <div className="modal-content bg-white p-5 rounded-[5px] w-[600px] max-w-[90%] shadow-2xl">
        <h2 className="text-center mb-5">Details Id Dishlist</h2>
        {item && item.length > 0 ? (
          item.map(({ alt_text, image }, index) => (
            <div
              className="modal-details flex flex-col mb-4 border border-solid border-gray-300 rounded-[5px] p-2.5 bg-[#f9f9f9]"
              key={index}
            >
              {image ? (
                <img
                  style={{ width: "30%", display: "block", margin: "10px auto", borderRadius: "4px" }}
                  src={image}
                  alt={alt_text || `Image ${index + 1}`}
                />
              ) : (
                <p style={{ textAlign: "center", margin: "10px 0" }}>Not found image</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center mx-2 first:font-bold ">No images available.</p>
        )}
        <button
          className="mt-5 px-[10px] py-[15px] bg-[#007bff] text-white border-none rounded-[5px] cursor-pointer hover:bg-[#0056b3]"
          onClick={onHideModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailById;
