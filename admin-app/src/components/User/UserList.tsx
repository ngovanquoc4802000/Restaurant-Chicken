import { useEffect, useState } from "react";
import { UsersTs } from "../../types/users";
import { getUserAll, updateUser } from "../../services/users";
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
    create_at: new Date(),
  });
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false); // Trạng thái cho modal thành công
  const [showIsModal, setShowIsModal] = useState<boolean>(false);
  const [editingUpdateId, setEditingUpdateId] = useState<number | null | undefined>(null);

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
    const userFind: UsersTs | undefined = userList.find((item) => item.id === id);
    if (userFind) {
      setValueUser({
        fullname: userFind.fullname,
        email: userFind.email,
        phone_number: userFind.phone_number,
        address: userFind.address,
        password: userFind.password,
        create_at: new Date(),
      });
      setEditingUpdateId(id);
      setShowIsModal(true);
    }
  };
  const resetForm = () => {
    setShowIsModal(false);
    setValueUser({
      fullname: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
      create_at: new Date(),
    });
    setEditingUpdateId(null);
  };
  const onUpdate = (update: UsersTs) => {
    setUserList((prev) => prev.map((cat) => (cat.id === update.id ? update : cat)));
    setShowSuccessModal(true);
    resetForm();
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const submit = async () => {
      try {
        const { fullname, email, address, phone_number, password, create_at } = valueUser;
        const newUpdate: UsersTs = {
          fullname,
          email,
          address,
          phone_number,
          password,
          create_at,
        };
        const result: UsersTs | undefined = await updateUser(editingUpdateId, newUpdate);
        if (result) {
          onUpdate(result);
          const { data } = await getUserAll();
          setUserList(data);
          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    };
    submit();
  };
  const handleChange = (e: { target: { name: string; value: string | number } }) => {
    const { name, value } = e.target;
    setValueUser({ ...valueUser, [name]: value });
  };
  const handleCancel = () => {
    setShowIsModal(false);
  };
  const handleCloseModalSuccess = () => {
    setShowSuccessModal(false);
  };
  return (
    <div className="user-list-container">
      <h3>User List</h3>
      {showSuccessModal && (
        <div id="successModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModalSuccess}>
              &times;
            </span>
            <h2>Success!</h2>
            <p>Congratulations function has been updated successfully.</p>
            <button id="confirmButton" onClick={handleCloseModalSuccess}>
              Agree
            </button>
          </div>
        </div>
      )}
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
            <input type="text" id="phoneNumber" name="phoneNumber" value={valueUser.phone_number} onChange={handleChange} required />
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
