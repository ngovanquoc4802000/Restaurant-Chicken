export interface OrderAllTs {
  success: boolean;
  message: string;
  data: OrderTableTs[];
}
export interface OrderTableTs {
  id?: number;
  user_id: number | string;
  address: string;
  customer_note: string;
  customer_name: string;
  customer_phone: string;
  total_price?: number;
  status?: boolean | string;
  create_at: Date;
  update_at?: Date;
  paid?: boolean;
  process?: string;
  details: OrderDetailsTs[];
}
export interface CreateOrderPayload {
  user_id: number | string;
  address: string;
  customer_note: string;
  customer_name: string;
  customer_phone: string;
  list_order: OrderDetailsTs[];
}

export interface OrderDetailsTs {
  id?: number;
  id_dishlist: number | string;
  quantity: number;
  price: number;
  note: string;
  create_at?: Date;
  update_at?: Date;
}

export interface OrderProcess {
  success: boolean;
  message: string;
  nextStep: string;
}
