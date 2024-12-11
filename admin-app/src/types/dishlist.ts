export type DishListFace = {
  id?: number;
  title: string;
  price: string;
  content: string;
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
