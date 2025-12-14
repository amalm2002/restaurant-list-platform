import { CreateRestaurantDTO } from "../../dto/restaurant.dto";

export interface IRestaurantRepository {
  findAll(): Promise<any[]>;
  create(data: CreateRestaurantDTO): Promise<any>;
  update(id: string, data: CreateRestaurantDTO): Promise<any>;
  delete(id: string): Promise<void>;
}
