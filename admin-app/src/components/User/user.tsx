import { useQuery } from "@tanstack/react-query";
import queriesUser from "../../queries/users";
import Button from "../button/button";
import UserDetail from "./userDetail";
import { useState } from "react";

function User() {
  const { isLoading, isError, data: userList } = useQuery({ ...queriesUser.list });

  const [showIsModal, setShowIsModal] = useState<boolean>(false);

  const [idDetail, setIdDetail] = useState<number | null | undefined>(null);

  if (isLoading || !userList) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  const handleEdit = (id: number | undefined) => {
    setShowIsModal(true);
    setIdDetail(id);
  };

  return (
    <div className="user-list-container">
      <h3>User List</h3>
      {showIsModal && <UserDetail idDetail={idDetail} onHideModal={() => setShowIsModal(false)} />}
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
          {userList.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.fullname}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              <td>{item.address}</td>
              <td>•••••••</td> {/* hoặc item.password nếu bạn muốn show */}
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
