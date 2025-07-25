export interface ApiGetAllDishList {
  success: boolean;
  message: string;
  data: DishTs[];
}
export interface DishTs {
  id?: number;
  category_id: number | string;
  name: string;
  title: string;
  currency: string;
  price: number;
  description: string;
  images: Image[];
}
export interface Image {
  id_dishlist?: number;
  alt_text: string;
  image: string;
}
