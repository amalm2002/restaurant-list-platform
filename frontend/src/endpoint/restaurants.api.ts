import axiosConnection from "@/services/axios/axios";
import { RestaurantFormData, Restaurant } from "@/types/restaurant";

export const getRestaurantsApi = async (): Promise<Restaurant[]> => {
  const res = await axiosConnection.get("/restaurants");
  return res.data.data;
};

export const createRestaurantApi = async (
  payload: RestaurantFormData
): Promise<Restaurant> => {
  const res = await axiosConnection.post("/restaurants", payload);
  return res.data.data;
};

export const updateRestaurantApi = async (
  id: string,
  payload: RestaurantFormData
): Promise<Restaurant> => {
  const res = await axiosConnection.put(`/restaurants/${id}`, payload);
  return res.data.data;
};

export const deleteRestaurantApi = async (id: string): Promise<void> => {
  await axiosConnection.delete(`/restaurants/${id}`);
};
