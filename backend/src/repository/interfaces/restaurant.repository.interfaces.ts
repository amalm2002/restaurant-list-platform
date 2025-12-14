import { CreateRestaurantDTO } from "../../dto/restaurant.dto";
import { RestaurantDocument } from "../../model/Restaurant";

export interface IRestaurantRepository {
  findAll(): Promise<RestaurantDocument[]>;
  create(data: CreateRestaurantDTO): Promise<RestaurantDocument>;
  update(id: string, data: CreateRestaurantDTO): Promise<RestaurantDocument | null>;
  delete(id: string): Promise<void>;
  findByEmailOrPhone(email: string, phone: string): Promise<RestaurantDocument | null>;
  findDuplicateForUpdate(id: string, email: string, phone: string): Promise<RestaurantDocument | null>;
}
