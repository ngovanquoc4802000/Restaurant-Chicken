import Button from "$/common/button/button";
import { useCategoryPages } from "$/modules/Storefont/hooks/dashboard/useCategoryPages";
import type { DishTs } from "$/modules/Storefont/mockup/dishlist";
import type { RootState } from "$/modules/Storefont/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../footer";
import Header from "../header";
import SuccessToast from "../modal/successToast";
import OrderOptions from "../oder";
import { slugify } from "./ultils/slugify";
import { useNavigate } from "react-router-dom";

function Category() {
  const { categories, id, dishlist, handleProductClick, handleClick, isLoading, isError, refs, setRef } =
    useCategoryPages();
  const [showAddToBucketToast, setShowAddToBucketToast] = useState(false);

  const [addToBucketToastMessage, setAddToBucketToastMessage] = useState("");

  const rule = useSelector((state: RootState) => state.userLogin.rule);
  const navigate = useNavigate();
  const handleClickAdd = (item: DishTs) => {
    const existingCart = localStorage.getItem("storeCart");
    let storeCart = [];
    if (existingCart) {
      storeCart = JSON.parse(existingCart);
    }
    const idCart: number = 1;
    const order = {
      id: idCart,
      image: item.images?.[0]?.image,
      name: item.name,
      price: item.price,
      quantity: 1,
    };
    storeCart.push(order);
    setAddToBucketToastMessage(`Đã thêm ${item.title} vào giỏ hàng`);
    setShowAddToBucketToast(true);
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
    localStorage.setItem("storeCart", JSON.stringify(storeCart));
  };
  useEffect(() => {
    if (id && refs.current[id]) {
      const timeout = setTimeout(() => {
        refs.current[id]?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [id, refs]);

  if (isLoading || categories.length === 0 || dishlist.length === 0) return <div>Loading...</div>;

  if (isError) return <div>Error loading category or dishes</div>;

  return (
    <div className="category-full">
      <Header />
      <OrderOptions />
      {showAddToBucketToast && (
        <SuccessToast
          message={addToBucketToastMessage}
          duration={3000}
          onClose={() => setShowAddToBucketToast(false)}
        />
      )}
      <div className="content">
        <div className="category-page">
          <div className="tabs pt-[67px] lg:pt-[22px]  lg:max-w-[1300px] lg:m-auto lg:overflow-hidden md:sticky lg: lg:shadow  text-[16px] md:text-[18px] md:bg-white md:text-black md:z-[99] lg:z-[99] md:top-[102px] fixed w-full z-[9] pt-22 lg:pt-0 md:pt-0 md:mt-[-1px] bg-[#201224] text-white  md:bg-none lg:bg-none  text-center overflow-x-scroll whitespace-nowrap ">
            {categories.map((item) => (
              <Button
                key={item.id}
                className="p-2 md:p-4 lg:p-6 hover:underline cursor-pointer"
                onClick={() => handleClick(item.name)}
                classNameLogic={slugify(item.name) === id ? "active bg-[#e4002b] p-2  text-white " : "p-2 bg-[#201224]"}
                text={item.name}
              />
            ))}
          </div>
          <div className="sections-product pt-5 md:pt-[-2rem] lg:pt-0 scroll-mt-[px] md:scroll-mt-0 lg:scroll-mt-0 ">
            {categories.map((section) => {
              const categorySlug = slugify(section.name);
              const sectionDishes = dishlist.filter((dish) => String(dish.category_id) === String(section.id));
              return (
                <div
                  key={section.id}
                  ref={setRef(categorySlug)}
                  id={categorySlug}
                  className="section-block pt-[6rem] md:pt-[0.5rem] lg:pt-[0]  scroll-mt-1 md:scroll-mt-44 lg:scroll-mt-47 xl:scroll-mt-52  xl:max-w-[1200px] xl:m-auto "
                >
                  <h2 className="m-5 text-[18px] md:text-3xl md:m-5 lg:m-5 font-black">{section.name}</h2>
                  {sectionDishes.length > 0 ? (
                    <div className="item">
                      <div className="item-full">
                        <div className="container mx-auto px-4">
                          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                            {sectionDishes.map((item) => (
                              <div className="w-full sm:1/2 md:1/3 lg:w-1/4 " key={item.id}>
                                <div className="product-card w-[11rem] cursor-pointer md:w-[250px] lg:w-[230px] xl:w-[280px] shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-transform duration-200 rounded-xl overflow-hidden bg-white transition-transform duration-200">
                                  {item.images?.[0]?.image && (
                                    <div className="Image shadow-md p-[1rem] md:p-[16px] lg:p-[16px] ">
                                      <div className="product-image relative">
                                        <img
                                          onClick={() => handleProductClick(String(section.id), item.title)}
                                          className="min-w-full md:w-full h-auto block"
                                          src={item.images[0].image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div
                                        onClick={() => handleProductClick(String(section.id), item.title)}
                                        className="product-info min-h-[170px]  md:min-h-[120px] lg:min-h-[195px]  xl:min-h-[125px] py-[10px] md:px-[15px] lg:px-[15px]"
                                      >
                                        <div className="title-price flex justify-between ">
                                          <h3 className="text-[16px] md:text-[16px] lg:text-[18px] font-bold m-0">
                                            {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
                                          </h3>
                                          <span className="price text-[16px] md:text-[16px] lg:text-[18px] font-bold text-[#000]">
                                            {item.price}
                                          </span>
                                        </div>
                                        <p className="description text-[13px] text-[#555] my-[8px] mx-[0px] min-h-9">
                                          {" "}
                                          {window.innerWidth < 500
                                            ? item.description.length > 45
                                              ? item.description.slice(0, 45) + "..."
                                              : item.description
                                            : item.description
                                              ? window.innerWidth < 1024
                                                ? item.description.length > 62
                                                : item.description.slice(0, 62) + "..."
                                              : item.description}
                                        </p>
                                      </div>
                                      {rule === "customer" ? (
                                        <div className="flex justify-end">
                                          <Button
                                            onClick={() => handleProductClick(String(section.id), item.title)}
                                            text="Customise"
                                            className="w-full hover:bg-gray-300 hover:text-white cursor-pointer border border-gray-300 p-2 rounded-[50px] bg-white font-bold"
                                          />
                                          <hr />
                                          <Button
                                            onClick={() => handleClickAdd(item)}
                                            text="Add"
                                            className="w-full cursor-pointer ml-2 bg-red-500 rounded-[50px] text-white font-bold p-1 "
                                          />
                                        </div>
                                      ) : (
                                        <Button
                                          onClick={() => handleProductClick(String(section.id), item.title)}
                                          text="Add"
                                          className="w-full text-white p-2 font-bold rounded-[50px] cursor-pointer hover:bg-gray-400 bg-gray-300"
                                        />
                                      )}
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
                    <p className="m-5 md:m-5 lg:m-5 font-stretch-50%">There are no dishes in this category..</p>
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
