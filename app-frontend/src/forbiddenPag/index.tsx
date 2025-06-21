import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage: React.FC = () => {
  const handleLogOut = () => {
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Truy cập bị từ chối
        </h2>
        <p className="text-gray-600 mt-2">
          Bạn không có quyền xem trang này. Vui lòng liên hệ quản trị viên nếu
          bạn tin rằng đây là một lỗi.
        </p>
        <div className="mt-6">
          <Link
          onClick={handleLogOut}
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Về trang chủ
          </Link>
          <Link
            to="/account"
            className="ml-4 inline-block bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Đăng nhập lại
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
