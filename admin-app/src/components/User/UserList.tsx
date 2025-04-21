import { useEffect, useState } from "react";
import { UsersTs } from "../../types/users";
import { getUserAll } from "../../services/users";
import "./User.css";

const UserList = () => {
  const [userList, setUserList] = useState<UsersTs[]>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getUserAll();
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="user-list-container">
      <h3>User List</h3>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
