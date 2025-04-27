export interface CategoryTs {
  success: boolean;
  message: string;
  data: ValueCategory[];
}

export interface ValueCategory {
  id?: number;
  name: string;
  handle: string;
  image: string;
  status?: boolean | number;
}
