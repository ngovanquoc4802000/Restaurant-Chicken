export interface CategoryTs {
  id: number;
  name?: string;
  handle?: string;
  image?: string;
  success: boolean;
  message: string;
  data: [];
}

export interface ValueCategory {
  name: string;
  handle: string;
  image: string;
}
