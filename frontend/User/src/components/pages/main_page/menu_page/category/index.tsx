import { NavLink } from "react-router-dom";
import type { ValueCategory } from "../../../../../mockup/categories";

interface CategoriesPageTs {
  category: ValueCategory[];
}

function CategoryPage({category}: CategoriesPageTs) {
  return (
    <section className="menu-section p-5">
      <h1 className="text-[28px] mb-5">Danh mục món ăn</h1>
      <div className="menu-grid grid grid-cols-4 gap-5 py-0 px-3">
        {
          category.map((item) => (
            <NavLink style={{ color: "#000", textDecoration: "none", fontWeight: "700", fontSize: "1.2rem" }} className="menu-link" to="">
              <div className="menu-item hover:scale-105 bg-white rounded-lg overflow-hidden transition-transform duration-200 ease-in " key={item.id}>
                <img className="w-full h-auto block" src={item.image} alt={item.handle} />
                <p style={{ padding: "10px" }}>{item.name}</p>
              </div>
            </NavLink>
          ))
        }

      </div>
    </section>
  );
}

export default CategoryPage;