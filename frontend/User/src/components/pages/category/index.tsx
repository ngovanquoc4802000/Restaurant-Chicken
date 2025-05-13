import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../dashboard/footer";
import Header from "../dashboard/header";
import OrderOptions from "../dashboard/oder";
import "../dashboard/styles.scss";
import "./styles.scss";
import { slugify } from "./ultils/slugify";

interface CategoryTs {
  id: string;
  label: string;
  title?: DishNewTs[];
}
interface DishNewTs {
  id: number;
  image: string;
  title: string;
  price: string;
  content: string;
  button: string;
}

const dishNew: DishNewTs[] = [
  {
    id: 1,
    image: "https://static.kfcvietnam.com.vn/images/items/lg/burgeryo-new.jpg?v=38Xan3",
    title: "BURGER GÀ YO",
    price: "29.000₫",
    content: "1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)",
    button: "Thêm",
  },
  {
    id: 2,
    image: "https://static.kfcvietnam.com.vn/images/items/lg/burgeryo-new.jpg?v=38Xan3",
    title: "BURGER chicken",
    price: "29.000₫",
    content: "1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)",
    button: "Thêm",
  },
  {
    id: 3,
    image: "https://static.kfcvietnam.com.vn/images/items/lg/burgeryo-new.jpg?v=38Xan3",
    title: "BURGER GÀ YO",
    price: "29.000₫",
    content: "1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)",
    button: "Thêm",
  }, {
    id: 4,
    image: "https://static.kfcvietnam.com.vn/images/items/lg/burgeryo-new.jpg?v=38Xan3",
    title: "BURGER GÀ YO",
    price: "29.000₫",
    content: "1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)",
    button: "Thêm",
  }
]


const sections: CategoryTs[] = [
  { id: "mon-moi", label: "Món Mới", title: dishNew },
  { id: "combo-1", label: "Combo 1 Người" },
  { id: "combo-nhom", label: "Combo Nhóm" },
  { id: "ga-ran", label: "Gà Rán - Gà Quay" },
  { id: "burger", label: "Burger - Cơm - Mì Ý" },
  { id: "thuc-an-nhe", label: "Thức Ăn Nhẹ" },
];


function Category() {
  const navigate = useNavigate();

  const { id } = useParams();

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleProductClick = (categoryId: string, productTitle: string) => {
    const slug = slugify(productTitle);
    navigate(`/menu/${categoryId}/${slug}`);
  };

  useEffect(() => {
    if (id && refs.current[id]) {
      refs.current[id]?.scrollIntoView({ behavior: "smooth" });
    } 
  }, [id]);
  return (
    <div className="category-full">
      {/* Header */}
      <Header />
      <OrderOptions />
      {/* content */}
      <div className="content">
        <div className="category-page">
          <div className="tabs">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={id === section.id ? "active" : ""}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="sections-product">
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => (refs.current[section.id] = el)}
                id={section.id}
                className="section-block"
              >
                {/* phần h2 này là không được xoá */}
                <h2>{section.label}</h2>
                <div className="item">
                  <div className="item-full">
                    <div className="container">
                      <div className="row">
                        {section.title?.map((item) => (
                          <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product-card"
                             onClick={() => handleProductClick(section.id, item.title)}
                             style={{ cursor: "pointer" }}
                            >
                              <div className="product-image">
                                <img src={item.image} alt={item.title} />
                                <div className="badge">MỚI chỉ 29K</div>
                              </div>
                              <div className="product-info">
                                <div className="title-price">
                                  <h3>{item.title}</h3>
                                  <span className="price">{item.price}</span>
                                </div>
                                <p className="description">{item.content}</p>
                                <button className="add-button">{item.button}</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Category;