import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { slugify } from "./ultils/slugify";
import { useQueries } from "@tanstack/react-query";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import OrderOptions from "../dashboard/oder";
import queriesCategories from "../../../queries/categories";
import queriesDishlist from "../../../queries/dishlist";
import "./styles.scss";
import "../dashboard/styles.scss";

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
          <div className="tabs">
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.name)}
                className={slugify(item.name) === id ? "active" : ""}
              >
                {item.name}
              </button>
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
                        <div className="container">
                          <div className="row">
                            {sectionDishes.map((item) => (
                              <div className="col-lg-3 col-md-4 col-sm-6" key={item.id}>
                                <div
                                  className="product-card"
                                  onClick={() =>
                                    handleProductClick(String(section.id), item.title)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {item.images?.[0]?.image && (
                                    <div className="Image">
                                      <div className="product-image">
                                        <img
                                          src={item.images[0].image}
                                          alt={item.title}
                                        />
                                      </div>
                                      <div className="product-info">
                                        <div className="title-price">
                                          <h3>{item.title}</h3>
                                          <span className="price">{item.price}</span>
                                        </div>
                                        <p className="description">{item.description}</p>
                                        <button className="add-button">Thêm</button>
                                      </div>
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
