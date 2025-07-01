import Button from "$/common/button/button";
import { useEffect } from "react";
import { useOrderForm } from "../../hooks/useOrderForm";
import queriesOrder from "../../queries/orders";

interface OrderFormTs {
  idDetail: number | undefined | null;
  onHideModal: () => void;
}

function OrderForm({ onHideModal, idDetail }: OrderFormTs) {
  const {
    isPending,
    queryClient,
    isEdit,
    orderData,
    orderDetails,
    userData,
    detail,
    dishListId,
    handleSubmitOrder,
    setOrderData,
    handleAddDish,
    handleOrderInputChange,
    handleOrderInputDetails,
    findNameDishList,
  } = useOrderForm(onHideModal, idDetail);
  useEffect(() => {
    if (isEdit && detail) {
      const list = queryClient.getQueryData(queriesOrder.list.queryKey);

      const find = list?.find((item) => item.id === idDetail);

      if (find) {
        // Hoặc dùng trực tiếp 'detail'
        setOrderData({
          user_id: find.user_id,
          address: find.address,
          customer_name: find.customer_name,
          customer_note: find.customer_note,
          customer_phone: find.customer_phone,
          create_at: find.create_at,
          details: find.details.map((item) => ({
            // Đảm bảo details từ API có ID riêng
            id: item.id, // Giả sử API trả về ID cho từng detail item
            id_dishlist: item.id_dishlist,
            quantity: item.quantity,
            price: item.price,
            note: item.note,
          })),
          id: detail.id, // ID của order chính
          status: detail.status,
          paid: detail.paid,
          process: detail.process,
          total_price: detail.total_price,
          update_at: detail.update_at,
        });
      }
    } else {
      setOrderData({
        user_id: "",
        address: "",
        customer_note: "",
        customer_name: "",
        customer_phone: "",
        details: [],
        create_at: new Date(),
      });
    }
  }, [isEdit, detail, queryClient, idDetail]);

  return (
    <form
      onSubmit={handleSubmitOrder}
      className="form
       max-w-[600px]
        bg-red-900
        p-5 
         absolute
          fixed
           overflow-y-auto
             bg-black/70
              left-1/2   
                top-1/2
                 -translate-x-1/2
                 -translate-y-1/2
                rounded-[5px]
                 max-h-[95vh]
       
       "
      style={{ zIndex: 1000 }}
    >
      <h2 className="text-center mb-5 text-gray-200 text-2xl font-semibold">Create new order</h2>

      <div>
        {isPending && <h1>Save...</h1>}

        <div className="form-group mb-3.5">
          <label className=" text-white  block mb-4" htmlFor="user_id">
            User:
          </label>
          <select
            className="w-full p-2 border bg-white text-black border-solid border-gray-300 rounded-[4px] ] text-w"
            id="user_id"
            name="user_id"
            value={String(orderData.user_id)}
            onChange={handleOrderInputChange}
            required
          >
            <option value="">Select User</option>
            {userData?.map((user) => (
              <option className="text-black" key={user.id} value={String(user.id)}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className=" text-white  block mb-4">Address:</label>
          <input
            className="w-full p-2 border border-solid border-gray-300 rounded-[4px] bg-[#fff] text-black"
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleOrderInputChange}
          />
        </div>

        <div className="form-group text-white block mb-4">
          <label className=" text-white  block mt-4 mb-4">Customer Note:</label>
          <textarea
            className="w-full p-2 border border-solid border-gray-300 rounded-[4px] bg-[#fff] text-black"
            name="customer_note"
            value={orderData.customer_note || ""}
            onChange={handleOrderInputChange}
          />
        </div>

        <div className="form-group">
          <label className=" text-white  block mb-4">Customer name:</label>
          <input
            className="w-full p-2 border border-solid border-gray-300 rounded-[4px] bg-[#fff] text-black"
            type="text"
            name="customer_name"
            value={orderData.customer_name || ""}
            onChange={handleOrderInputChange}
          />
        </div>

        <div className="form-group">
          <label className=" text-white  block mb-4 mt-4">Telephone:</label>
          <input
            className="w-full p-2 border border-solid border-gray-300 rounded-[4px] bg-[#fff] text-black"
            type="text"
            name="customer_phone"
            value={orderData.customer_phone || ""}
            onChange={handleOrderInputChange}
          />
        </div>
      </div>

      {/* Add dish */}
      <div className="dish-form mb-5 pt-5 border-t border-solid border-gray-300">
        <div className="dish-grid grid grid-cols-[1fr_1fr_1fr_auto] gap-2.5 mb-2.5 items-end">
          <div className="form-group">
            <label className=" text-white">ID dishlist:</label>
            <select
              className="h-10 border border-solid border-gray-200 rounded-[4px] bg-white text-black"
              name="id_dishlist"
              id="id_dislist"
              value={String(orderDetails.id_dishlist)}
              onChange={handleOrderInputDetails}
            >
              <option value="">Options dishlist</option>
              {dishListId?.map((dishlist) => (
                <option key={dishlist.id} value={String(dishlist.id)}>
                  {dishlist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className=" text-white">Quantity:</label>
            <input
              className="border bg-white border-solid w-[120px] border-gray-200 h-[40px] rounded-[4px] text-black"
              type="number"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleOrderInputDetails}
            />
          </div>

          <div>
            <label className=" text-white">Price:</label>
            <input
              className="border border-solid w-[120px] border-gray-200 h-[40px] rounded-[4px] text-black bg-white"
              type="number"
              name="price"
              value={orderDetails.price}
              onChange={handleOrderInputDetails}
            />
          </div>

          <div>
            <button
              className="px-2.5 py-3.5 bg-blue-500 text-white border-none rounded-[4px] cursor-pointer relative top-[32%]"
              onClick={handleAddDish}
            >
              Add
            </button>
          </div>
        </div>

        <div className="dish-note mb-3">
          <label className="block mb-1 text-white">Food notes:</label>
          <input
            className="w-full p-1.5 rounded-[4px] border border-solid border-gray-300 bg-white text-black"
            type="text"
            name="note"
            value={orderDetails.note}
            onChange={handleOrderInputDetails}
          />
        </div>
      </div>

      <div className="order-summary border-t border-solid text-white border-gray-200 pt-5 mb-5">
        <h3>Details Order ({orderData.details?.length} dishlist)</h3>
        {orderData.details?.length === 0 ? (
          <p className="text">No dishes have been added yet</p>
        ) : (
          <ul className="list-none p-0">
            {orderData.details?.map((item, index) => (
              <li key={index} className="border-b border-dashed border-gray-300 pb-2.5 mb-2.5 text-gray-300">
                dishlist {index + 1}: ID {findNameDishList(item.id_dishlist)}, quantity {item.quantity}, Giá{" "}
                {item.price} - notes: {item.note || "No"}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        className="submit-button w-full disabled:bg-gray-400 cursor-not-allowed  p-2.5 bg-[#28a745] text-white border-none rounded-[4px] cursor-pointer text-base mb-2.5"
        disabled={isPending}
        type="submit"
      >
        Create order
      </button>

      <div className="form-actions flex justify-end">
        <button
          type="submit"
          className="save-button mr-1 px-[8px] py-[10px] bg-[#007bff] border-none text-white rounded-[4px] cursor-pointer disabled:bg-gray-500 cursor-not-allowed"
          disabled={isPending}
        >
          {idDetail ? "Update" : "Save"}
          {isPending && <span className="spinner-border spinner-border-sm"></span>}
        </button>
        <Button
          className="bg-red-400 border-none text-white px-[10px] py-[15px] rounded-[4px] cursor-pointer"
          text="cancel"
          onClick={onHideModal}
        />
      </div>
    </form>
  );
}

export default OrderForm;
