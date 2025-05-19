import "../styles.scss";
import ListFooter from "./list";
import { initialListApps, initialListFllowOrder, initialListIcons, initialListMenu, initialListPolicy, initialListTitleKFC } from "./mockup/mockup";


function Footer() {
  return (
    <footer className="footer bg-[#1c1c1c] text-[#fff] font-sans p-6">
      <div className="footer__content grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid gap-6 pb-6 border-b-2 border-gray-[#444] ">
        <ListFooter item={initialListMenu} textTitle="Danh Mục Món Ăn" />
        <ListFooter item={initialListTitleKFC} textTitle="Về KFC" />
        <ListFooter item={initialListFllowOrder} textTitle="Liên Hệ KFC" />
        <ListFooter item={initialListPolicy} textTitle="Chính Sách" />
        <ListFooter itemImage={initialListApps} itemIcons={initialListIcons} textTitle="Download app" />
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