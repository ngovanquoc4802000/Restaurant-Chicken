import "../styles.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__column">
          <h3>Danh Mục Món Ăn</h3>
          <ul>
            <li>Ưu Đãi</li>
            <li>Món Mới</li>
            <li>Combo 1 Người</li>
            <li>Combo Nhóm</li>
            <li>Gà Rán - Gà Quay</li>
            <li>Burger - Cơm - Mì Ý</li>
            <li>Thức Ăn Nhẹ</li>
            <li>Thức Uống & Tráng Miệng</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3>Về KFC</h3>
          <ul>
            <li>Câu Chuyện Của Chúng Tôi</li>
            <li>Tin Khuyến Mãi</li>
            <li>Tin tức KFC</li>
            <li>Tuyển dụng</li>
            <li>Đặt tiệc Sinh nhật</li>
            <li>Đơn Lớn Giá Hời</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3>Liên hệ KFC</h3>
          <ul>
            <li>Theo dõi đơn hàng</li>
            <li>Hệ Thống Nhà Hàng</li>
            <li>Liên hệ KFC</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3>Chính sách</h3>
          <ul>
            <li>Chính sách hoạt động</li>
            <li>Chính sách và quy định</li>
            <li>Chính sách bảo mật thông tin</li>
          </ul>
        </div>
        <div className="footer__column">
          <h3>Download App</h3>
          <div className="footer__apps">
            <img src="appstore.png" alt="App Store" />
            <img src="googleplay.png" alt="Google Play" />
          </div>
          <div className="footer__socials">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>Copyright © 2023 KFC Vietnam</p>
        <div className="footer__info">
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