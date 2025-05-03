import { Image } from "../../types/dishlist";

interface detailImageTs {
  item: Image[];
  onHideModal: () => void;
}

function DetailById({ item, onHideModal }: detailImageTs) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ textAlign: "center" }}>Details Id Dishlist</h2>
        {item && item.length > 0 ? (
          item.map(({ alt_text, image }, index) => (
            <div className="modal-details" key={index}>
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
          <p style={{ textAlign: "center", margin: "10px 0" }}>No images available.</p>
        )}
        <button onClick={onHideModal}>Close</button>
      </div>
    </div>
  );
}

export default DetailById;
