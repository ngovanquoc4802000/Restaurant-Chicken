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
  textTitle
}:
  ListClassNameTs) {
  return (
    <div className="footer__column">
    <h3 className={`${classNameTitle}`}>{textTitle}</h3>
    <ul className={classNameUl}>
      {
        item?.map((item, index) => (
          <li
            key={index}
            className={classNameLi}
            onClick={() => onClickItem?.(item)}
          >{item}</li>
        ))}
    </ul>
    <div className="footer_apps">
      {
        itemImage?.map((item,index) => (
          <img key={index} className={classNameImage} src={item} alt={item}  />
        ))
      }
      <div className="footer__socials mt-4">
        {
          itemIcons?.map((item,id) => (
            <i key={id} className={`${classNameIcons}${item}`}></i>
          ))
        }
      </div>
    </div>
    </div>
  );
}

export default ListFooter;