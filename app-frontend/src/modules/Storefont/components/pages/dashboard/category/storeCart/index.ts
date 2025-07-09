export interface CartTs {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
  uniqueId: string;
}
export type StoreCart = CartTs[];

export let Store: StoreCart = [];

const findCart = localStorage.getItem("storeCart");
if (findCart) {
  try {
    const parsedCart = JSON.parse(findCart);
    if (Array.isArray(parsedCart)) {
      Store = parsedCart;
    } else {
      console.log("không có dữ liệu từ localStorage: " + Store);
    }
  } catch (error) {
    console.log("không có array " + error);
  }
}
