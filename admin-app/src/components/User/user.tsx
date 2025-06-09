import { useCustomUsers } from "../../customHook/useCustomUsers";
import Button from "../common/button/button";
import UserDetail from "./userDetail";

function User() {
  const { setStateUser, handleEdit, stateUser, isError, isLoading, userList } = useCustomUsers();

  if (isLoading || !userList) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="user-list-container">
      <h3>User List</h3>
      {stateUser.showIsModal && (
        <UserDetail idDetail={stateUser.idDetail} onHideModal={() => setStateUser((prev) => ({ ...prev, showIsModal: false }))} />
      )}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>PassWord</th>
            <th>Create_At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              <td>{item.address}</td>
              <td>•••••••</td>
              <td>
                {new Intl.DateTimeFormat("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                  timeZone: "Asia/Ho_Chi_Minh",
                }).format(new Date(item.create_at))}
              </td>
              <td>{true.toString()}</td>
              <td>
                <Button action="edit" onClick={() => handleEdit(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
