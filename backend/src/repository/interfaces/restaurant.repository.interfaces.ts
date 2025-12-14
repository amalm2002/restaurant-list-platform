import { CreateRestaurantDTO } from "../../dto/restaurant.dto";
import { RestaurantDocument } from "../../model/Restaurant";

export interface IRestaurantRepository {
  findAll(): Promise<RestaurantDocument[]>;
  create(data: CreateRestaurantDTO): Promise<RestaurantDocument>;
  update(id: string, data: CreateRestaurantDTO): Promise<RestaurantDocument | null>;
  delete(id: string): Promise<void>;
}
