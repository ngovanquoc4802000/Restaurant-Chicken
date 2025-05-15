import "../styles.scss";

function Footer() {
  return (
    <footer className="footer bg-[#1c1c1c] text-[#fff] font-sans p-6">
      <div className="footer__content grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid gap-6 pb-6 border-b-2 border-gray-[#444] ">
        <div className="footer__column">
          <h3 className="text-[1.4rem] mb-4 text-[#ff] font-semibold">Danh Mục Món Ăn</h3>
          <ul className="list-none p-0 m-0 ">
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Ưu Đãi</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Món Mới</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Combo 1 Người</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Combo Nhóm</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Gà Rán - Gà Quay</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Burger - Cơm - Mì Ý</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Thức Ăn Nhẹ</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Thức Uống & Tráng Miệng</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="text-[1.4rem] mb-4 text-[#fff] font-semibold">Về KFC</h3>
          <ul className="list-none p-0 m-0 ">
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Câu Chuyện Của Chúng Tôi</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Tin Khuyến Mãi</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Tin tức KFC</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Tuyển dụng</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Đặt tiệc Sinh nhật</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Đơn Lớn Giá Hời</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="text-[1.4rem] mb-4 text-[#fff] font-semibold">Liên hệ KFC</h3>
          <ul className="list-none p-0 m-0 ">
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Theo dõi đơn hàng</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Hệ Thống Nhà Hàng</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Liên hệ KFC</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="text-[1.4rem] mb-4 text-[#fff] font-semibold">Chính sách</h3>
          <ul className="list-none p-0 m-0 ">
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Chính sách hoạt động</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Chính sách và quy định</li>
            <li className="mb-[0.5rem] text-[0.875rem] cursor-pointer">Chính sách bảo mật thông tin</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3 className="text-[1.4rem] mb-4 text-[#fff] font-semibold">Download App</h3>
          <div className="footer__apps">
            <img className="h-10 mr-2" src="appstore.png" alt="App Store" />
            <img className="h-10 mr-2" src="googleplay.png" alt="Google Play" />
          </div>
          <div className="footer__socials mt-4">
            <i className="text-[1.25rem] mr-3 cursor-pointer fab fa-facebook-f"></i>
            <i className="text-[1.25rem] mr-3 cursor-pointer fab fa-instagram"></i>
            <i className="text-[1.25rem] mr-3 cursor-pointer fab fa-youtube"></i>
            <i className="text-[1.25rem] mr-3 cursor-pointer fab fa-twitter"></i>
          </div>
        </div>
      </div>

      <div className="footer__bottom pt-6 text-[0.875rem]">
        <p>Copyright © 2023 KFC Vietnam</p>
        <div className="footer__info mt-4">
          <p><strong>CÔNG TY LIÊN DOANH TNHH KFC VIỆT NAM</strong></p>
          <p>Số 292 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, TP. Hà Nội.</p>
          <p>Điện thoại: (028) 38489828 - Email: lienhe@kfcvietnam.com.vn</p>
          <p>Mã số thuế: 0100773885 - Ngày cấp: 29/10/1998</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;