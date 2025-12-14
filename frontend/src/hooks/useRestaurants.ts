import { useEffect, useState } from "react";
import {
  getRestaurantsApi,
  createRestaurantApi,
  updateRestaurantApi,
  deleteRestaurantApi,
} from "@/endpoint/restaurants.api";
import { Restaurant, RestaurantFormData } from "@/types/restaurant";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurantsApi();
      setRestaurants(data);
    } finally {
      setIsLoading(false);
    }
  };

  const addRestaurant = async (data: RestaurantFormData) => {
    try {
      const created = await createRestaurantApi(data);
      setRestaurants((prev) => [...prev, created]);
      return created;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Something went wrong";
      throw new Error(message);
    }
  };

  const updateRestaurant = async (id: string, data: RestaurantFormData) => {
    try {
      const updated = await updateRestaurantApi(id, data);
      setRestaurants((prev) =>
        prev.map((r) => (r.id === id ? updated : r))
      );
      return updated;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update restaurant"
      );
    }
  };

  const deleteRestaurant = async (id: string) => {
    try {
      await deleteRestaurantApi(id);
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete restaurant"
      );
    }
  };

  return {
    restaurants,
    isLoading,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
};
