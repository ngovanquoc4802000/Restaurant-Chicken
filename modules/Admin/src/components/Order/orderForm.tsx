import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { createOrder, updateOrder } from "../../services/order";
import { CreateOrderPayload, OrderDetailsTs, OrderTableTs } from "../../types/order";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import queriesDishlist from "../../queries/dishlist";
import queriesOrder from "../../queries/orders";
import queriesUser from "../../queries/users";
import Button from "../button/button";
import "./OrderList.scss";

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

  const isEdit = idDetail !== null && idDetail !== undefined;

  const result = useQueries({
    queries: [
      {
        ...queriesUser.list,
      },
      {
        ...queriesOrder.detail(idDetail),
        enabled: isEdit,
      },
      {
        ...queriesDishlist.list,
      },
    ],
  });

  const userData = result[0].data;

  const detail = result[1].data;

  const dishListId = result[2].data;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    submitOrder();
  };
  /* create or update Order || */
  const createOrUpdate = useCallback(async () => {
    const sanitizedDetails = orderData.details.map((item) => ({
      id: idDetail,
      id_dishlist: Number(item.id_dishlist),
      quantity: Number(item.quantity),
      price: Number(item.price),
      note: item.note || "",
    }));
    const payload: CreateOrderPayload = {
      user_id: Number(orderData.user_id),
      address: orderData.address,
      customer_note: orderData.customer_note,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      list_order: sanitizedDetails,
    };
    return isEdit && idDetail ? await updateOrder(idDetail, payload) : await createOrder(payload);
  }, [orderData, idDetail, isEdit]);

  /* use useMutation PUT/PATCH/CREATE/DELETE */
  const { isPending, mutate: submitOrder } = useMutation({
    mutationFn: createOrUpdate,

    onSuccess: (data: OrderTableTs) => {
      queryClient.invalidateQueries({ queryKey: queriesOrder.list.queryKey });

      queryClient.setQueryData(queriesOrder.list.queryKey, (update: OrderTableTs[] | undefined | null) => {
        if (!update) return [];

        return update.map((item) => (item.id === idDetail ? { ...item, ...data } : item));
      });

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

  const handleOrderInputDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "quantity" || name === "price" || name === "id_dishlist") {
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

  const dishlistName = useMemo(() => {
    const map = new Map();
    dishListId?.forEach((item) => map.set(item.id, item.name));
    return map;
  }, [dishListId]);

  const findNameDishList = useCallback((id: string | number) => dishlistName.get(id) || undefined, [dishlistName]);

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

      {/* Chi tiết đơn hàng */}
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
