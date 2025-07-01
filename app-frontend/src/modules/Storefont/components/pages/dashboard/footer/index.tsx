import "../styles.scss";
import ListFooter from "./list";
import {
  initialListApps,
  initialListFllowOrder,
  initialListIcons,
  initialListMenu,
  initialListPolicy,
  initialListTitleKFC,
} from "./mockup/mockup";

function Footer() {
  return (
    <footer className=" md:py-6  md:px-6 bg-[#1c1c1c] text-[#fff] font-sans p-6 ">
      <div className="footer__content xl:max-w-[1200px] xl:m-auto  grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid gap-6   border-b-2 border-gray-[#444] ">
        <ListFooter item={initialListMenu} textTitle="Category dish" />
        <ListFooter item={initialListTitleKFC} textTitle="About KFC" />
        <ListFooter item={initialListFllowOrder} textTitle="Contact Us" />
        <ListFooter item={initialListPolicy} textTitle="Policy" />
        <ListFooter itemImage={initialListApps} itemIcons={initialListIcons} textTitle="Download app" />
      </div>
      <div className="footer__bottom pt-6 text-[0.875rem] xl:max-w-[1200px] xl:m-auto">
        <p className="text-center">Copyright © 2023 KFC Vietnam</p>
      </div>
    </footer>
  );
}

export default Footer;
