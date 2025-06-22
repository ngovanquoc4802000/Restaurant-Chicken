import type { ValueCategory } from "$/modules/Storefont/mockup/categories";
import { NavLink } from "react-router-dom";

interface CategoriesPageTs {
  category: ValueCategory[];
}

function CategoryPage({category}: CategoriesPageTs) {
  return (
    <section className="menu-section p-5  xl:max-w-[1200px] xl:m-auto">
      <h1 className="text-[20px] md:text-[24px] lg:text-[35px] lg lg:text-[3xl] ml-3 md:lg-5 font-bold mb-5 ">Category dish</h1>
      <div className="menu-grid grid grid-cols-4 lg:grid-cols-4 md:grid-cols-4 gap-5 py-0 px-3">
        {
          category.map((item) => (
            <NavLink className="menu-link text-[#000] decoration-none font-bold text-[18px]" to="/menu-page">
              <div className="menu-item hover:scale-105 bg-white rounded-lg overflow-hidden transition-transform duration-200 ease-in " key={item.id}>
                <img className="w-full h-auto block" src={item.image} alt={item.handle} />
                <p className="text-[10px] md:text-[16px] lg:text-[20px]" style={{ padding: "10px" }}>{item.name}</p>
              </div>
            </NavLink>
          ))
        }
      </div>
    </section>
  );
}

export default CategoryPage;