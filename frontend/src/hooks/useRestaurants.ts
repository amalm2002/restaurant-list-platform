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
    console.log(data,'===')
    const created = await createRestaurantApi(data);
    setRestaurants((prev) => [...prev, created]);
  };

  const updateRestaurant = async (id: string, data: RestaurantFormData) => {
    const updated = await updateRestaurantApi(id, data);
    setRestaurants((prev) =>
      prev.map((r) => (r.id === id ? updated : r))
    );
  };

  const deleteRestaurant = async (id: string) => {
    await deleteRestaurantApi(id);
    setRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    restaurants,
    isLoading,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
  };
};
