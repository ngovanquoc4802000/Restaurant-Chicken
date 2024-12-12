export type DishListFace = {
  id?: number;
  title: string;
  price: string;
  content: string;
  data: DishListFace[];
  image?: string;
  pagination?: {
    page: number;
    limit: number;
    totalPage: number;
  };
};

export interface DataFace {
  id?: number;
  title: string;
  price: string;
  content: string;
  image?: string;
}

export interface UpdateFormDish {
  id?: number;
  title: string;
  price: string;
  content: string;
  image?: string;
  data?: DataFace;
}

export interface PayloadOrder {
  address: string;
  customer_note: string;
  customer_name: string;
  customer_phone: string;
  list_order: OrderDetails[];
}

export interface OrderDetails {
  id_dishlist: number;
  quantity: number;
  price: number;
  note: string;
}

export interface ResponseApiCreateOrder {
  success: boolean;
  message: string;
  orderId: number;
}
