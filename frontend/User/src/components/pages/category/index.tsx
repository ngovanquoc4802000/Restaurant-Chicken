import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "./ultils/slugify";
import { useQueries } from "@tanstack/react-query";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import OrderOptions from "../dashboard/oder";
import queriesCategories from "../../../queries/categories";
import queriesDishlist from "../../../queries/dishlist";
import "../dashboard/styles.scss";
import Button from "../common/button";

function Category() {

  const navigate = useNavigate();

  const { id } = useParams();

  const resultOptions = useQueries({
    queries: [
      { ...queriesCategories.list },
      { ...queriesDishlist.list },
    ]
  });

  const categories = resultOptions[0].data ?? [];

  const dishlist = resultOptions[1].data ?? [];

  const isLoading = resultOptions.some((res) => res.isLoading);

  const isError = resultOptions.some((res) => res.error);

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const setRef = useCallback(
    (slug: string) => (el: HTMLDivElement | null) => {
      if (el) refs.current[slug] = el;
    },
    []
  );

  const handleClick = (name: string) => {
    const slug = slugify(name);
    navigate(`/menu/${slug}`);

    const target = refs.current[slug];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu/${categoryId}/${slug}`);
  };

  // Scroll to section if URL has ID
  useEffect(() => {
    if (id && refs.current[id]) {
      const timeout = setTimeout(() => {
        refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [id]);

  if (isLoading || categories.length === 0 || dishlist.length === 0)
    return <div>Loading...</div>;

  if (isError) return <div>Error loading category or dishes</div>;

  return (
    <div className="category-full">
      <Header />
      <OrderOptions />

      <div className="content">
        <div className="category-page">
          {/* Tabs */}
          <div className="tabs text-center">
            {categories.map((item) => (
              <Button key={item.id} onClick={() => handleClick(item.name)} classNameLogic={slugify(item.name) === id ? "active bg-[#e4002b] p-2 text-white " : "p-2 bg-[#201224]"} text={item.name} />
            ))}
          </div>

          {/* Sections for each category */}
          <div className="sections-product">
            {categories.map((section) => {
              const categorySlug = slugify(section.name);
              const sectionDishes = dishlist.filter(
                (dish) => String(dish.category_id) === String(section.id)
              );

              return (
                <div
                  key={section.id}
                  ref={setRef(categorySlug)}
                  id={categorySlug}
                  className="section-block"
                >
                  {/* Không được xoá */}
                  <h2>{section.name}</h2>

                  {sectionDishes.length > 0 ? (
                    <div className="item">
                      <div className="item-full">
                        <div className="container mx-auto px-4">
                          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                            {sectionDishes.map((item) => (
                              <div className="w-full sm:w-1/2 md:1/3 lg:w-1/4" key={item.id}>
                                <div
                                  className="product-card shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-200 w-60 rounded-xl overflow-hidden bg-white transition-transform duration-200"
                                  onClick={() =>
                                    handleProductClick(String(section.id), item.title)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {item.images?.[0]?.image && (
                                    <div className="Image">
                                      <div className="product-image relative">
                                        <img
                                          className="w-full h-auto block"
                                          src={item.images[0].image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="product-info py-[10px] px-[15px]">
                                        <div className="title-price flex justify-between items-center">
                                          <h3 className="text-[16px] font-bold m-0">{item.title}</h3>
                                          <span className="price font-bold text-[#000]">{item.price}</span>
                                        </div>
                                        <p className="description text-[13px] text-[#555] my-[8px] mx-[0px] min-h-9">{item.description}</p>
                                      </div>
                                      <Button text="Thêm" className="add-button w-full py-[10px] px-[0px] border-none rounded-[20px] font-bold text-[#444] cursor-pointer bg-[#d9d9d9] hover:bg-[#c4c4c4]" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>Không có món ăn nào trong danh mục này.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Category;
