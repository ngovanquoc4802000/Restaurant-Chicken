interface Dish {
  id: number;
  name: string;
  price: number;
}

const DishList = () => {
  // Dữ liệu giả định
  const dishes: Dish[] = [
    { id: 1, name: "Pizza Margherita", price: 10.99 },
    { id: 2, name: "Spaghetti Carbonara", price: 12.5 },
    { id: 3, name: "Chocolate Cake", price: 6.75 },
  ];

  return (
    <div>
      <h3>Dish List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>{dish.id}</td>
              <td>{dish.name}</td>
              <td>${dish.price.toFixed(2)}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Thêm các chức năng quản lý món ăn (thêm, sửa, xóa) ở đây */}
    </div>
  );
};

export default DishList;
