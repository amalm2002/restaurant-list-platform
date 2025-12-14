export interface CreateRestaurantDTO {
  name: string;
  cuisine: string;
  address: string;
  phone: string
  email: string
}

export interface RestaurantResponseDTO {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}