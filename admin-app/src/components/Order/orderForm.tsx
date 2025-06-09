import { useEffect } from "react";
import { useOrderForm } from "../../customHook/useOrderForm";
import queriesOrder from "../../queries/orders";
import Button from "../common/button/button";
import "./OrderList.scss";

interface OrderFormTs {
  idDetail: number | undefined | null;
  onHideModal: () => void;
}

function OrderForm({ onHideModal, idDetail }: OrderFormTs) {
  const {
    handleSubmitOrder,
    isPending,
    queryClient,
    isEdit,
    orderData,
    setOrderData,
    orderDetails,
    userData,
    detail,
    dishListId,
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
        setOrderData({
          user_id: find.user_id,
          address: find.address,
          customer_name: find.customer_name,
          customer_note: find.customer_note,
          customer_phone: find.customer_phone,
          create_at: find.create_at,
          details: find.details,
        });
      }
    } else {
      setOrderData(orderData);
    }
  }, [isEdit, detail, queryClient, userData, idDetail, setOrderData, orderData]);

  return (
    <form onSubmit={handleSubmitOrder} className="form">
      <h2>Tạo Đơn Hàng Mới</h2>

      <div>
        <h3>Thông tin khách hàng</h3>
        {isPending && <h1>Save...</h1>}

        <div className="form-group">
          <label htmlFor="user_id">User:</label>
          <select id="user_id" name="user_id" value={String(orderData.user_id)} onChange={handleOrderInputChange} required>
            <option value="">Select User</option>
            {userData?.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Địa chỉ:</label>
          <input type="text" name="address" value={orderData.address} onChange={handleOrderInputChange} />
        </div>

        <div className="form-group">
          <label>Ghi chú khách hàng:</label>
          <textarea name="customer_note" value={orderData.customer_note || ""} onChange={handleOrderInputChange} />
        </div>

        <div className="form-group">
          <label>Tên khách hàng:</label>
          <input type="text" name="customer_name" value={orderData.customer_name || ""} onChange={handleOrderInputChange} />
        </div>

        <div className="form-group">
          <label>Số điện thoại:</label>
          <input type="text" name="customer_phone" value={orderData.customer_phone || ""} onChange={handleOrderInputChange} />
        </div>
      </div>

      {/* Thêm món ăn */}
      <div className="dish-form">
        <h3>Thêm món ăn</h3>
        <div className="dish-grid">
          <div className="form-group">
            <label>ID Món:</label>
            <select name="id_dishlist" id="id_dislist" value={String(orderDetails.id_dishlist)} onChange={handleOrderInputDetails}>
              <option value="">Chọn món ăn</option>
              {dishListId?.map((dishlist) => (
                <option key={dishlist.id} value={String(dishlist.id)}>
                  {dishlist.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Số lượng:</label>
            <input type="number" name="quantity" value={orderDetails.quantity} onChange={handleOrderInputDetails} />
          </div>

          <div>
            <label>Giá:</label>
            <input type="number" name="price" value={orderDetails.price} onChange={handleOrderInputDetails} />
          </div>

          <div>
            <button onClick={handleAddDish}>Thêm</button>
          </div>
        </div>

        <div className="dish-note">
          <label>Ghi chú món ăn:</label>
          <input type="text" name="note" value={orderDetails.note} onChange={handleOrderInputDetails} />
        </div>
      </div>

      <div className="order-summary">
        <h3>Chi tiết đơn hàng ({orderData.details?.length} món)</h3>
        {orderData.details?.length === 0 ? (
          <p>Chưa có món nào được thêm.</p>
        ) : (
          <ul>
            {orderData.details?.map((item, index) => (
              <li key={index}>
                Món {index + 1}: ID {findNameDishList(item.id_dishlist)}, SL {item.quantity}, Giá {item.price} - Ghi chú:{" "}
                {item.note || "Không"}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="submit-button" disabled={isPending} type="submit">
        Tạo Đơn Hàng
      </button>

      <div className="form-actions">
        <button type="submit" className="save-button" disabled={isPending}>
          {idDetail ? "Update" : "Save"}
          {isPending && <span className="spinner-border spinner-border-sm"></span>}
        </button>
        <Button action="cancel" onClick={onHideModal} />
      </div>
    </form>
  );
}

export default OrderForm;
