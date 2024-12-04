export interface Product {
  id: number;
  name: string;
  nameAr?: string;
  old_price: number;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  search: string;
  category: string;
}