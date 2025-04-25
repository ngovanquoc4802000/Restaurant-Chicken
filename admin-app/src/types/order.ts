export interface OrderAllTs {
  success: boolean;
  message: string;
  data: [];
}

export interface OrderTableTs {
  id?: number;
  user_id: number;
  address: string;
  customer_note: string;
  customer_name: string;
  customer_phone: string;
  total_price?: number;
  status?: boolean | string;
  create_at: Date;
  update_at?: Date;
  paid?: boolean;
  details: OrderDetailsTs[];
}

export interface OrderDetailsTs {
  id_dishlist: number;
  quantity: number;
  price: number;
  note: string;
  create_at?: Date;
  update_at?: Date;
}
export interface CreateOrderPayload {
  user_id: number;
  address: string;
  customer_note: string;
  customer_name: string;
  customer_phone: string;
  list_order: OrderDetailsTs[];
}
