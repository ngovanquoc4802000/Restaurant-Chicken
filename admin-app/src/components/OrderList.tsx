interface Order {
  id: number;
  userId: number;
  orderDate: string;
  totalAmount: number;
}

const OrderList = () => {
  // Dữ liệu giả định
  const orders: Order[] = [
    { id: 101, userId: 1, orderDate: "2025-04-10", totalAmount: 25.5 },
    { id: 102, userId: 2, orderDate: "2025-04-09", totalAmount: 18.75 },
  ];

  return (
    <div>
      <h3>Order List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.orderDate}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <button>View Details</button>
                <button>Mark as Shipped</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Thêm các chức năng quản lý đơn hàng (xem chi tiết, cập nhật trạng thái) ở đây */}
    </div>
  );
};

export default OrderList;
