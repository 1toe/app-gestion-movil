export interface Product {
  product_id?: number;
  product_name: string;
  product_price: number;
  product_image: string;
  product_state?: string;
  category_id?: number;
  provider_id?: number;
}
