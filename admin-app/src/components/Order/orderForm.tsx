import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import queriesOrder from "../../queries/orders";
import queriesUser from "../../queries/users";
import { createOrder, updateOrder } from "../../services/order";
import { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../types/order";
import Button from "../button/button";
import queriesDishlist from "../../queries/dishlist";

interface OrderFormTs {
  idDetail: number | undefined | null;
  onHideModal: () => void;
}

const initialOrder: OrderTableTs = {
  user_id: "",
  address: "",
  customer_note: "",
  customer_name: "",
  customer_phone: "",
  details: [],
  create_at: new Date(),
};

const initialDetail: OrderDetailsTs = {
  id_dishlist: "",
  quantity: 0,
  price: 0,
  note: "",
};

function OrderForm({ onHideModal, idDetail }: OrderFormTs) {
  const [orderData, setOrderData] = useState<OrderTableTs>(initialOrder);

  const [orderDetails, setOrderDetails] = useState<OrderDetailsTs>(initialDetail);

  const queryClient = useQueryClient();

  const result = useQueries({
    queries: [
      {
        ...queriesUser.list,
      },
      {
        ...queriesOrder.detail(idDetail),
        enabled: idDetail !== null && idDetail !== undefined,
      },
    ],
  });
  const userData = result[0];
  const detail = result[1];

  const isEdit = idDetail !== null && idDetail !== undefined;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };

  /* create or update Order || */
  const createOrUpdate = useCallback(async () => {
    const payload: CreateOrderPayload = {
      user_id: Number(orderData.user_id),
      address: orderData.address,
      customer_note: orderData.customer_note,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      list_order: orderData.details,
    };

    return isEdit && idDetail ? updateOrder(idDetail, payload) : await createOrder(payload);
  }, [orderData, idDetail, isEdit]);

  /* use useMutation PUT/PATCH/CREATE/DELETE */
  const { isPending, mutate: submitOrder } = useMutation({
    mutationFn: createOrUpdate,

    onSuccess: (data: OrderTableTs) => {
      queryClient.invalidateQueries({ queryKey: queriesOrder.list.queryKey });

      if (isEdit && idDetail) {
        queryClient.setQueryData(queriesOrder.detail(idDetail).queryKey, data);
      }
      setOrderData(initialOrder);

      onHideModal();
    },
    onError: (error) => {
      console.log("Create Or Update Defails" + error);
    },
  });

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
      setOrderData(initialOrder);
    }
  }, [isEdit, detail, queryClient, userData, idDetail]);

  const handleAddDish = (e: React.MouseEvent) => {
    e.preventDefault();

    if (orderDetails.id_dishlist && orderDetails.quantity && orderDetails.price) {
      setOrderData((prev) => ({
        ...prev,
        details: [...prev.details, orderDetails],
      }));

      setOrderDetails({
        id_dishlist: 0,
        quantity: 0,
        price: 0,
        note: "",
      });
    }
  };
  const handleOrderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderInputDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price") {
      const numValue = Number(value);
      setOrderDetails((prev) => ({
        ...prev,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      setOrderDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const { data: dishListId } = useQuery({ ...queriesDishlist.list });
  return (
    <form onSubmit={handleSubmitOrder} className="form">
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>Tạo Đơn Hàng Mới</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Thông tin khách hàng</h3>

        {isPending && <h1>Save...</h1>}

        <div className="form-group">
          <label htmlFor="user_id">User:</label>
          <select id="user_id" name="user_id" value={String(orderData.user_id)} onChange={handleOrderInputChange} required>
            <option value={""}>Select User</option>
            {userData.data?.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.fullname}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Địa chỉ:</label>
          <input
            type="text"
            name="address"
            value={orderData.address}
            onChange={handleOrderInputChange}
            style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Ghi chú khách hàng:</label>
          <textarea
            name="customer_note"
            value={orderData.customer_note || ""}
            onChange={handleOrderInputChange}
            style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Tên khách hàng:</label>
          <input
            type="text"
            name="customer_name"
            value={orderData.customer_name || ""}
            onChange={handleOrderInputChange}
            style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Số điện thoại:</label>
          <input
            type="text"
            name="customer_phone"
            value={orderData.customer_phone || ""}
            onChange={handleOrderInputChange}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
      </div>
      {/* Form thêm chi tiết món ăn */}
      <div style={{ marginBottom: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Thêm món ăn</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "10px", marginBottom: "10px" }}>
          <div>
            <select name="id_dishlist" id="id_dislist">
              <label style={{ display: "block", marginBottom: "5px" }}>ID Món:</label>
              <option value={""}>Chọn món ăn</option>
              {dishListId?.map((dishlist) => (
                <option key={dishlist.id} value={String(dishlist.id)}>
                  {dishlist.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="id_dishlist"
              value={orderDetails.id_dishlist}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Số lượng:</label>
            <input
              type="number"
              name="quantity"
              value={orderDetails.quantity}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Giá:</label>
            <input
              type="number"
              name="price"
              value={orderDetails.price}
              onChange={handleOrderInputDetails}
              style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
          </div>
          <div style={{ alignSelf: "flex- end" }}>
            <button
              onClick={handleAddDish}
              style={{
                padding: "9px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
                top: "32%",
              }}
            >
              Thêm
            </button>
          </div>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Ghi chú món ăn:</label>
          <input
            type="text"
            name="note"
            value={orderDetails.note}
            onChange={handleOrderInputDetails}
            style={{ width: "100% ", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
          />
        </div>
      </div>
      {/* Danh sách các món đã thêm */}
      <div style={{ marginBottom: "20px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
        <h3 style={{ marginBottom: "10px", color: "#fff" }}>Chi tiết đơn hàng ({orderData.details?.length} món)</h3>
        {orderData.details?.length === 0 ? (
          <p style={{ color: "#fff" }}>Chưa có món nào được thêm.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orderData.details?.map((item, index) => (
              <li key={index} style={{ borderBottom: "1px dashed #eee", paddingBottom: "10px", marginBottom: "10px", color: "#fff" }}>
                Món {index + 1}: ID {item.id_dishlist}, SL {item.quantity}, Giá {item.price} - Ghi chú: {item.note || "Không"}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        disabled={isPending}
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "revert-layer",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
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
