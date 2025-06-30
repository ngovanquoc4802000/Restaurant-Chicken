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
  price: number | string;
  description: string;
  images: Image[];
}
export default interface Image {
  alt_text: string;
  image: string;
}
