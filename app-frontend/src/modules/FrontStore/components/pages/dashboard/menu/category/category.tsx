import { NavLink } from "react-router-dom";
import type { ValueCategory } from "../../../../../mockup/categories";
interface CategoriesTs {
  category: ValueCategory[];
}

function Categories({ category }: CategoriesTs) {
  return (
    <div className="xl:max-w-[1200px] xl:m-auto  ">
      <h1 className="text-[28px] ml-3.5 md:ml-5 lg:md-5 mb-2 md:mb-5 lg:mb-5 lg:mt-4 font-bold">Danh mục món ăn</h1>
      <section className="menu-sectio  gap-5 py-0 px-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ">
          {
            category.map((item) => (
              <NavLink style={{ color: "#000", textDecoration: "none", fontWeight: "700", fontSize: "1.2rem" }} className="menu-link" to="menu">
                <div className="menu-item hover:scale-105 shadow-md bg-white rounded-lg md:rounded-xl lg:rounded-2xl  overflow-hidden transition-transform duration-200 ease-in " key={item.id}>
                  <img className="w-full rounded-b-none  rounded-lg h-auto block" src={item.image} alt={item.handle} />
                  <p className="p-2.5 text-[16px] min-h-[65px] lg:text-[20px] lg:min-h-[0px]">{item.name}</p>
                </div>
              </NavLink>
            ))
          }
      </section>
    </div>
  );
}

export default Categories;