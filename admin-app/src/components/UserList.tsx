interface User {
  id: number;
  username: string;
  email: string;
}

const UserList = () => {
  // Dữ liệu giả định
  const users: User[] = [
    { id: 1, username: "alice123", email: "alice@example.com" },
    { id: 2, username: "bob.the.builder", email: "bob@example.com" },
  ];

  return (
    <div>
      <h3>User List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Thêm các chức năng quản lý người dùng (thêm, sửa, xóa) ở đây */}
    </div>
  );
};

export default UserList;
