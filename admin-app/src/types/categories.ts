export type CategoryType = {
  id: number;
  name: string;
  handle: string;
  image: string;
  data: CategoryType[];
  pagination: {
    page: number;
    litmit: number;
    totalPage: number;
  };
};

export type CreateCategoriesType = {
  name: string;
  handle: string;
  image?: string;
};
