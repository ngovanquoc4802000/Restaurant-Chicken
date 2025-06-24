import Button from "$/common/button/button";
import { useCustomUsers } from "../../hooks/useCustomUsers";
import UserDetail from "./userDetail";

function User() {
  const { setStateUser, handleEdit, stateUser, isError, isLoading, userList } =
    useCustomUsers();

  if (isLoading || !userList) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;
  const sortUserList = [...userList].sort((a,b) => Number(a.id)  - Number(b.id));
  return (
    <div className="user-list-container font-sans">
      <h3 className="text-center p-5 font-bold text-white bg-red-800 text-2xl text-gray-600">User </h3>
       <div className="p-5">
      {stateUser.showIsModal && (
        <UserDetail
          idDetail={stateUser.idDetail}
          onHideModal={() =>
            setStateUser((prev) => ({ ...prev, showIsModal: false }))
          }
        />
      )}
      <table className="user-table shadow-md w-full border-collapse bg-white overflow-hidden rounded-[8px]">
        <thead className="bg-red-800 p-2 text-white">
          <tr className=" text-center border border-b border-gray-200 font-bold text-[18px]">
            <th>ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Create_At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortUserList.map((item) => (
            <tr className="py-[12px] hover:bg-amber-50 px-[16px] text-left border border-b border-gray-200 font-bold text-[15px]" key={item.id}>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">{item.id}</td>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">{item.fullname}</td>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">{item.email}</td>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">{item.phone_number}</td>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">{item.address}</td>
              <td className="py-[12px] px-[16px] text-left border border-b border-amber-100 text-gray-600 text-[14px]">
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
              <td className="p-2 bg-blue-600 py-[10px] rounded-[4px] text-white  border border-b border-amber-100 ">online</td>
              <td>
                <Button className="p-2 bg-amber-300 text-white rounded-[4px]  border border-b border-amber-100" text="Edit" onClick={() => handleEdit(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>   

    </div>
  );
}

export default User;
