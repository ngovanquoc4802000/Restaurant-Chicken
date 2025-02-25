const menuContent = document.querySelector(".menu-content");
const footerSection = document.querySelector(".footer");
const sectionProduct = document.querySelector(".section-product");
const btnCart = document.querySelector(".btn-cart");
const cartContainer = document.querySelector(".cart-container");

const productsContainer = document.getElementById("products-container");
const totalNumberOf = document.querySelector(".total-items");
const subTotalCart = document.querySelector(".subtotal");
const taxesCart = document.querySelector(".taxes");
const totalCart = document.querySelector(".total");

const clearBtn = document.getElementById("clear-cart-btn");

const category = [
  {
    id: 0,
    titleName: "Danh mục món ăn",
    story: "Danh mục",
    news: "Món mới",
    historyChicken: "Lịch sử đặt hàng",
    happyBirthDay: "Đặt sinh nhật",
    bigShopping: "Thức ăn",
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

fetch("./mockup/diskList.json")
  .then((res) => res.json())
  .then((data) => {
    const API = data.data;
    renderContentProduct(API);
  });
const renderContentProduct = (data) => {
  data.splice(0, 2);
  data.map((item) => {
    sectionProduct.innerHTML +=  `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12" >
          <div class="category">
            <div class="card" >
              <img src="../../backend/uploads/dishlist/${item.image}"
                class="card-img-top" alt="Sunset Over the Sea" />
              <div class="card-body">
                <p class="card-text">
                  <span class="">${item.name}</span>
                  <span class="">${item.price}${item.currency}</span>
                </p>
                <div class="cart-content">${
                  item.title.length > 28 ? item.title.slice(0, 28) + "..." : ""
                }</div>
                <button id="${
                  item.id
                }" class="cart-full btn btn-primary" >Add cart</button>
              </div>
            </div>
          </div>
        </div>
    `;
  })
  /* truyền tham số */
  const cartFull = [...document.querySelectorAll(".cart-full")];
  addItems(cartFull, data);
};
class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
    this.taxes = 8.25;
  }
  addItemsCart(id, data) {
    const product = data.find((item) => item.id === id);
    const { name, price, currency } = product;
    this.items.push(product);

    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] =
        (totalCountPerProduct[dessert.id] || 0) + 1;
    });
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(
      `product-count-for-id${id}`
    );
    currentProductCount > 1
      ? (currentProductCountSpan.textContent = `${currentProductCount}x ${name}${currency}`)
      : (productsContainer.innerHTML += `<div class="product" id="dessert-${id}">
         <p>
           <span class="product-count" id="product-count-for-id${id}">${name}</span>
         </p>
         <p>${price}</p>
       </div>
      `);
  }
  getCount() {
    return (totalNumberOf.innerText = this.items.length);
  }
  calculatorTaxes(amount) {
    return parseFloat((this.taxes / 100) * amount).toFixed(3);
  }
  calculator() {
    const subTotal = this.items.reduce((acc, el) => acc + Number(el.price), 0);
    const taxes = this.calculatorTaxes(subTotal);
    const total = Number(subTotal) + Number(taxes);
    subTotalCart.textContent = `${subTotal.toFixed(3)}VND`;
    taxesCart.textContent = `$${taxes}VND`;
    totalCart.textContent = `$${total.toFixed(3)}VND`;
  }
  clearShopping() {
    productsContainer.innerHTML = ``;
    totalNumberOf.textContent = "";
    subTotalCart.textContent = 0;
    taxesCart.textContent = 0;
    totalCart.textContent = 0;
  }
}

const cart = new ShoppingCart();
const addItems = (items, data) => {
  items.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      cart.addItemsCart(Number(event.target.id), data);
      cart.getCount();
      cart.calculator();
    });
  });
};


btnCart.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

clearBtn.addEventListener("click", () => {
  cart.clearShopping();
});