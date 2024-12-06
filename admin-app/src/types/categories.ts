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

export interface DataFace {
  handle: string;
  id: number;
  image: string;
  name: string;
}

export interface UpdateFormFace {
  id?: number;
  name: string;
  handle: string;
  image?: string;
  data?: DataFace | undefined;
}
