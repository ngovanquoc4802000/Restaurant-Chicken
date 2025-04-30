import { OrderDetailsTs } from "../../types/order";

interface OrderTs {
  item: OrderDetailsTs[];
}

function OrderDetails({ item }: OrderTs) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        {item?.map(({ note, price, id_dishlist, quantity }, index) => (
          <div className="modal-details" key={index}>
            <p>Dishlist: {id_dishlist}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <p>Note: {note}</p>
          </div>
        ))}
        <button /* onClick={onClose} */>Close</button>
      </div>
    </div>
  );
}

export default OrderDetails;
