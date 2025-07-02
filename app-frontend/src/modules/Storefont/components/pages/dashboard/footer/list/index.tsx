import { useState } from "react";
import type { ListClassNameTs } from "../mockup/mockup";

function ListFooter({
  classNameUl = "list-none p-0 m-0",
  classNameLi = "mb-[0.5rem] text-[0.875rem] cursor-pointer",
  item,
  itemImage,
  itemIcons,
  classNameIcons = "text-[1.25rem] mr-3 cursor-pointer",
  classNameImage = "h-10 mr-2",
  onClickItem,
  classNameTitle = "text-[1.4rem] mb-4 text-[#ff] font-semibold",
  textTitle,
}: ListClassNameTs) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="footer__column mb-4 md:mb-0">
      <h3 className={`flex text-[16px] justify-between items-center ${classNameTitle} text-white`}>
        {" "}
        {/* text-white cho tiêu đề */}
        {textTitle}
        <button
          onClick={toggleOpen}
          className="md:hidden cursor-pointer  p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-expanded={isOpen}
          aria-controls={`footer-content-${textTitle?.replace(/\s/g, "-")}`}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </h3>

      <div
        id={`footer-content-${textTitle?.replace(/\s/g, "-")}`}
        className={`md:block ${isOpen ? "block" : "hidden"}`}
      >
        <ul className={`${classNameUl} text-gray-300`}>
          {item?.map((item, index) => (
            <li key={index} className={classNameLi} onClick={() => onClickItem?.(item)}>
              {item}
            </li>
          ))}
        </ul>
        <div className="footer_apps">
          <div className="flex flex-wrap gap-2 mb-4">
            {itemImage?.map((imgSrc, index) => (
              <img key={index} className={classNameImage} src={imgSrc} alt={`App ${index + 1}`} />
            ))}
          </div>
          <div className="footer__socials mt-4 flex items-center">
            {itemIcons?.map((iconClass, id) => (
              <i key={id} className={`${classNameIcons} ${iconClass}`}></i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFooter;
