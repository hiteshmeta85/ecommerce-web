export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: Product
}
