import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenuPages } from "../../../../hooks/useMenuPages";
import { slugify } from "../../category/ultils/slugify";
import Footer from "../../dashboard/footer";
import OrderOptions from "../../dashboard/oder";
import Header from "../header_page/header";
import Button from "../../common/button";

function MenuPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { categories, dishlist, isError, isLoading, refs, setRef } = useMenuPages();

  const handleClick = (name: string) => {
    const slug = slugify(name);
    navigate(`/menu-page/${slug}`);

    const target = refs.current[slug];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu-page/${categoryId}/${slug}`);
  };

  useEffect(() => {
    if (id && refs.current[id]) {
      const timeout = setTimeout(() => {
        refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [id, refs]);

  if (isLoading || categories.length === 0 || dishlist.length === 0) return <div>Loading...</div>;

  if (isError) return <div>Error loading category or dishes</div>;

  return (
    <div className="menuPage">
      <Header />
      <OrderOptions />

      <div className="content">
        <div className="category-page ">

          <div className="tabs fixed w-full md:fixed z-[9] pt-22 lg:pt-0 md:pt-0 md:mt-2 bg-[#201224] text-white  md:bg-none lg:bg-none  text-center overflow-x-auto whitespace-nowrap ">
            {categories.map((item) => (
              <Button
                key={item.id}
                onClick={() => handleClick(item.name)}
                className="p-2 md:p-4 lg:p-6"
                classNameLogic={slugify(item.name) === id ? "active bg-[#e4002b] p-2  text-white " : "p-2 bg-[#201224]"}
                text={item.name} />
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
                  className="section-block scroll-mt-32 md:scroll-mt-0"
                >
                  <h2 className="m-5 text-[16px] md:text-3xl md:m-5 lg:m-5 font-black">{section.name}</h2>
                  {sectionDishes.length > 0 ? (
                    <div className="item">
                      <div className="item-full">
                        <div className="container mx-auto px-4">
                          <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4">
                            {sectionDishes.map((item) => (
                              <div className="w-full sm:1/2 md:1/3 lg:w-1/4" key={item.id}>
                                <div
                                  className="product-card  w-[11rem] md:w-[220px] lg:w-[230px] xl:w-[280px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-200 rounded-xl overflow-hidden bg-white transition-transform duration-200"
                                  onClick={() =>
                                    handleProductClick(String(section.id), item.title)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {item.images?.[0]?.image && (
                                    <div className="Image shadow-md p-2 md:p-0 lg:p-0">
                                      <div className="product-image relative">
                                        <img
                                          className="min-w-full md:w-full p-2 shadow-lg rounded-lg h-auto block"
                                          src={item.images[0].image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="product-info  min-h-[120px] md:min-h-[160px] xl:min-h-[160px] py-[10px] md:px-[15px] lg:px-[15px]">
                                        <div className="title-price flex justify-between items-center">
                                          <h3 className="text-[14px] md:text-[16px] lg:text-2xl font-bold m-0">{window.innerWidth < 640 ?item.title.length > 11 ? item.title.slice(0, 11) + "..." : item.title : item.title}</h3>
                                          <span className="price text-[14px] md:text-[16px] lg:text-2xl font-bold text-[#000]">{item.price}</span>
                                        </div>
                                        <p className="description text-[13px] text-[#555] my-[8px] mx-[0px] min-h-9">
                                          {
                                            window.innerWidth < 640
                                              ? item.description.length > 33
                                                ? item.description.slice(0, 33) + "..."
                                                : item.description : item.description
                                          }
                                        </p>
                                      </div>
                                      <button className="add-button w-full py-[10px] px-[0px] border-none rounded-[20px] font-bold text-[#444] cursor-pointer bg-[#d9d9d9] hover:bg-[#c4c4c4]">Thêm</button>
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