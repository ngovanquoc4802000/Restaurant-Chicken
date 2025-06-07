import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryPages } from "../../../../hooks/dashboard/useCategoryPages";
import Button from "../../common/button";
import Footer from "../../dashboard/footer";
import { slugify } from "../../dashboard/menu/ultils";
import Header from "../header_page/header";
import OrderOptionsPage from "../options_page";

function MenuPage() {
  
  const { id } = useParams();

  const navigate = useNavigate();

  const { categories, dishlist, isError, isLoading, refs, setRef } = useCategoryPages();

  const handleClick = (name: string) => {

    const slug = slugify(name);
    
    navigate(`/menu-page/${slug}`);

    const target = refs.current[slug];
    
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu-page/${categoryId}/${slug}`);
  };

  useEffect(() => {
    if (id && refs.current[id]) {
      const timeout = setTimeout(() => {
        refs.current[id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [id, refs]);

  if (isLoading || categories.length === 0 || dishlist.length === 0)
    return <div>Loading...</div>;

  if (isError) return <div>Error loading category or dishes</div>;

  return (
    <div className="menuPage">
      <Header />
      <OrderOptionsPage />
      <div className="content">
        <div className="category-page ">
          <div className="tabs md:sticky shadow-md xl:shadow-md lg:sticky  text-[16px] md:text-[18px] md:bg-white md:text-black md:z-[99] lg:z-[99] md:top-[102px] fixed w-full z-[9] pt-22 lg:pt-0 md:pt-0 md:mt-[-1px] bg-[#201224] text-white  md:bg-none lg:bg-none  text-center overflow-x-auto whitespace-nowrap ">
            {categories.map((item) => (
              <Button
                key={item.id}
                className="p-2 md:p-4 lg:p-6 hover:underline cursor-pointer"
                onClick={() => handleClick(item.name)}
                classNameLogic={ slugify(item.name) === id ? "active bg-[#e4002b] p-2 text-white ": "p-2 bg-[#201224]"}text={item.name}/>
            ))}
          </div>
          <div className="sections-product pt-32 md:pt-0 lg:pt-0 scroll-mt-[px] md:scroll-mt-0 lg:scroll-mt-0 ">
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
                  className="section-block scroll-mt-32 md:scroll-mt-44 lg:scroll-mt-48 xl:scroll-mt-48  xl:max-w-[1200px] xl:m-auto   "
                >
                  <h2 className="m-5 text-[18px] md:text-3xl md:m-5 lg:m-5 font-black">
                    {section.name}
                  </h2>
                  {sectionDishes.length > 0 ? (
                    <div className="item">
                      <div className="item-full">
                        <div className="container mx-auto px-4">
                          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                            {sectionDishes.map((item) => (
                              <div
                                className="w-full sm:1/2 md:1/3 lg:w-1/4"
                                key={item.id}
                              >
                                <div
                                  className="product-card w-[11rem] md:w-[220px] lg:w-[230px] xl:w-[280px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-200 rounded-xl overflow-hidden bg-white transition-transform duration-200"
                                  onClick={() =>
                                    handleProductClick(
                                      String(section.id),
                                      item.title
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {item.images?.[0]?.image && (
                                    <div className="Image shadow-md p-2 md:p-[5px] lg:p-[6px] ">
                                      <div className="product-image relative">
                                        <img
                                          className="min-w-full md:w-full h-auto block"
                                          src={item.images[0].image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="product-info min-h-[150px] md:min-h-[160px] lg:min-h-[195px] xl:min-h-[160px] py-[10px] md:px-[15px] lg:px-[15px]">
                                        <div className="title-price flex justify-between items-center">
                                          <h3 className="text-[12px] md:text-[16px] lg:text-[18px] font-bold m-0">
                                            {item.title}
                                          </h3>
                                          <span className="price text-[12px] md:text-[16px] lg:text-[18px] font-bold text-[#000]">
                                            {item.price}
                                          </span>
                                        </div>
                                        <p className="description text-[13px] text-[#555] my-[8px] mx-[0px] min-h-9">
                                          {" "}
                                          {window.innerWidth < 500
                                            ? item.description.length > 45
                                              ? item.description.slice(0, 45) +
                                                "..."
                                              : item.description
                                            : item.description
                                            ? window.innerWidth < 1024
                                              ? item.description.length > 62
                                              : item.description.slice(0, 62) +
                                                "..."
                                            : item.description}
                                        </p>
                                      </div>
                                      <Button
                                        text="Thêm"
                                        className="add-button w-full py-[10px] px-[0px] border-none rounded-[20px] font-bold text-[#444] cursor-pointer bg-[#d9d9d9] hover:bg-[#c4c4c4]"
                                      />
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

export default MenuPage;
