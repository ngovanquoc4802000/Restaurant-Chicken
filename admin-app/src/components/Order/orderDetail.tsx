import { useQuery } from "@tanstack/react-query";
import { OrderDetailsTs } from "../../types/order";
import queriesDishlist from "../../queries/dishlist";
import { useCallback, useMemo } from "react";

interface OrderTs {
  item: OrderDetailsTs[];
  onHideModal: () => void;
}

function OrderDetails({ item, onHideModal }: OrderTs) {
  const { data: dishlistName } = useQuery({ ...queriesDishlist.list });

  const orderMap = useMemo(() => {
    const map = new Map();
    dishlistName?.forEach((cat) => map.set(cat.id, cat.name));
    return map;
  }, [dishlistName]);

  const getOrderName = useCallback((id: string | number) => orderMap.get(id) || "undefined", [orderMap]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        {item?.map(({ note, price, id_dishlist, quantity }, index) => (
          <div className="modal-details" key={index}>
            <p>Dishlist: {getOrderName(id_dishlist)}</p>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <p>Note: {note}</p>
          </div>
        ))}
        <button onClick={onHideModal}>Close</button>
      </div>
    </div>
  );
}

export default OrderDetails;
