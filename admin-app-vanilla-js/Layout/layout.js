const menuContent = document.querySelector(".menu-content");
const footerSection = document.querySelector(".footer");
const sectionProduct = document.querySelector(".section-product");
const btnCart = document.querySelector(".btn-cart");
const cartContainer = document.querySelector(".cart-container")


const category = [
  {
    id: 0,
    titleName: "Danh mục món ăn",
    story: "Danh mục",
    news: "Món mới",
    historyChicken: "Lịch sử đặt hàng",
  },
  {
    id: 1,
    titleName: "Về KFC",
    story: "Câu chuyện của chúng tôi",
    news: "Tin Khuyến mãi",
    historyChicken: "Tuyển dụng",
    happyBirthDay: "Đặt tiệc Sinh nhật",
    bigShopping: "Đơn lớn Giá hời",
  },
  {
    id: 2,
    titleName: "Liên hệ KFC",
    story: "Theo dõi đơn hàng",
    news: "Liên hệ KFC",
  },
  {
    id: 3,
    titleName: "Chính sách",
    story: "Chính sách hoạt động",
    news: "Chính sách và quy định",
    historyChicken: "Chính sách bảo mật thông tin",
  },
];
const Footer = [
  {
    id: 0,
    titleName: "Danh mục món ăn",
    story: "Danh mục",
    news: "Món mới",
    historyChicken: "Lịch sử đặt hàng",
  },
  {
    id: 1,
    titleName: "Về KFC",
    story: "Câu chuyện của chúng tôi",
    news: "Tin Khuyến mãi",
    historyChicken: "Tuyển dụng",
    happyBirthDay: "Đặt tiệc Sinh nhật",
    bigShopping: "Đơn lớn Giá hời",
  },
  {
    id: 2,
    titleName: "Liên hệ KFC",
    story: "Theo dõi đơn hàng",
    news: "Liên hệ KFC",
  },
  {
    id: 3,
    titleName: "Chính sách",
    story: "Chính sách hoạt động",
    news: "Chính sách và quy định",
    historyChicken: "Chính sách bảo mật thông tin",
  },
];
const renderMenu = (all = category) => {
  all.forEach(
    (
      { titleName, story, news, historyChicken, happyBirthDay, bigShopping },
      index
    ) => {
      menuContent.innerHTML += `
    <ul class="${index} list-inline">
     <h5>${titleName}</h5>
      <li class="">${story}</li>
      <li class="">${news}</li>
      <li class="">${historyChicken ? "" : ""}</li>
      <li class="">${happyBirthDay ? "" : ""}</li>
      <li class="">${bigShopping ? "" : ""}</li>
      <foo
      <hr>
    </ul>
    `;
    }
  );
};
const renderFooter = (all = Footer) => {
  footerSection.innerHTML = ``;
  all.forEach(
    (
      { titleName, story, news, historyChicken, happyBirthDay, bigShopping },
      index
    ) => {
      footerSection.innerHTML += `
      <div class="col-lg-3">
      <ul class="${index} list-inline">
       <h5 class="text-white">${titleName}</h5>
        <li class="text-white">${story}</li>
        <li class="text-white">${news}</li>
        <li class="text-white">${historyChicken ? "" : ""}</li>
        <li class="text-white">${happyBirthDay ? "" : ""}</li>
        <li class="text-white">${bigShopping ? "" : ""}</li>
        <hr>
      </ul>
      </div>
    `;
    }
  );
};
renderMenu();
renderFooter();

fetch("http://localhost:7777/dishlist")
  .then((res) => res.json())
  .then((data) => {
    const API = data.data;
    renderContentProduct(API);
  });

const renderContentProduct = (data) => {
  data.splice(0,2)
  const HTMLString = data
    .forEach(({image,name,price,currency,title},index) => {
      sectionProduct.innerHTML += `
      <div class="col-lg-3 col-md-4 col-sm-6 col-12" >
            <div class="category">
              <div class="card" >
                <img src="../../backend/uploads/dishlist/${image}"
                  class="card-img-top" alt="Sunset Over the Sea" />
                <div class="card-body">
                  <p class="card-text">
                    <span class="">${name }</span>
                    <span class="">${price}${currency}</span>
                  </p>
                  <div class="cart-content">${title.length > 28 ? title.slice(0,28) + "..." : ""}</div>
                  <button id="${index}" class="cart-full add-to-cart btn btn-primary d-inline-block" >Add cart</button>
                </div>
              </div>
            </div>
          </div>
    `;
    })
};

class ShoppingCart {
  constructor() {
    this.array = [];
    this.total = 0;
  }
}

const addToCart = document.getElementsByName(".add-to-cart");
[...addToCart].forEach((btn) => {
  console.log("Aaa")
})

btnCart.addEventListener("click",() => {
  cartContainer.classList.toggle("active")
})