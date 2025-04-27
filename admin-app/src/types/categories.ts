export interface CategoryTs {
  success: boolean;
  message: string;
  data: ValueCategory[];
}

export interface IResponseUpdateCategory {
  success: boolean;
  message: string;
  data: unknown;
}

export interface ValueCategory {
  id?: number;
  name: string;
  handle: string;
  image: string;
  status?: boolean | number;
}
