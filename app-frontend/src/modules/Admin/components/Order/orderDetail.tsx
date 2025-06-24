import Button from "$/common/button/button";
import { useOrderDetails } from "../../hooks/userOrderDetails";
import type { OrderDetailsTs } from "../../types/order";

interface OrderTs {
  item: OrderDetailsTs[];
  orderId: number | undefined | null;
  currentStep?: string;
  onHideModal: () => void;
}

function OrderDetails({ item, onHideModal, orderId, currentStep }: OrderTs) {
  const { update, step, getOrderName } = useOrderDetails(currentStep, orderId);
  if (!item) return <h1>I don't item no show </h1>;

  return (
    <div className="modal-overlay fixed bg-black/70 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="modal-content bg-white p-5 rounded-[4px] w-[600px] max-w-[90%] shadow-2xl">
        <h2 className="mb-5 bg-red-800 text-center text-white font-bold p-2 rounded-md">Detail Order</h2>
        <p>
          <strong className="">Current state:</strong> {step || "No update"}
        </p>

        {item.map((item) => (
          <div
            className="modal-details flex flex-col mb-4 border border-solid border-gray-300 rounded-[4px] p-2.5 bg-white "
            key={item.id_dishlist}
          >
            <p className="mx-5px p-2 font-bold">Dish: <span className="font-medium italic ml-1">{getOrderName(item.id_dishlist)}</span></p>
            <p className="mx-5px p-2 font-bold">Quantity:<span className="font-medium italic ml-1">{item.quantity}</span></p>
            <p className="mx-5px p-2 font-bold">Price:<span className="font-medium italic ml-1">{item.price}</span></p>
            <p className="mx-5px p-2 font-bold">Notes:<span className="font-medium italic ml-1">{item.note}</span></p>
          </div>
        ))}

        <div className="mt-5 flex gap-2.5">
          <Button className="bg-amber-500 text-white p-2 rounded-md font-bold" text="Cancel" onClick={onHideModal} />
          <Button className="bg-red-800 text-white p-2 rounded-md" text="Update" onClick={update} />
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
