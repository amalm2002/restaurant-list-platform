export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  cuisine: string;
  createdAt: string;
  updatedAt: string;
}

export type RestaurantFormData = Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>;
