import { useEffect, useState } from "react";
import { UsersTs } from "../../types/users";
import { getUserAll } from "../../services/users";
import "./User.css";
import Button from "../button/button";

const UserList = () => {
  const [userList, setUserList] = useState<UsersTs[]>([]);
  const [valueUser, setValueUser] = useState<UsersTs>({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    status: true,
    create_at: new Date(),
  });
  const [showIsModal, setShowIsModal] = useState<boolean>(false);
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
  const handleEdit = (id: number | undefined) => {
    const userFind = userList.find((item) => item.id === id);
    if (userFind) {
      setValueUser({
        fullname: userFind.fullname,
        email: userFind.email,
        phone_number: userFind.phone_number,
        address: userFind.address,
        password: userFind.password,
        status: userFind.status ? 1 : 0,
        create_at: new Date(),
      });
      setShowIsModal(true);
    }
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const handleChange = (e: { target: { name: string; value: string | number } }) => {
    const { name, value } = e.target;
    setValueUser({ ...valueUser, [name]: value });
  };
  const handleCancel = () => {
    setShowIsModal(false);
  };
  return (
    <div className="user-list-container">
      <h3>User List</h3>
      {showIsModal && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" name="fullname" value={valueUser.fullname} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={valueUser.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={valueUser.phone_number} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" value={valueUser.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" disabled value={valueUser.password} onChange={handleChange} required />
          </div>
          <Button action="save" />
          <Button action="cancel" onClick={handleCancel} />
        </form>
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
};

export default UserList;
