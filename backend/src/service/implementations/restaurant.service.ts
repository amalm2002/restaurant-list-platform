import { RestaurantRepository } from "../../repository/implementations/restaurant.repository";
import {
  CreateRestaurantDTO,
  RestaurantResponseDTO,
} from "../../dto/restaurant.dto";
import { IRestaurantService } from "../interfaces/restaurant.service.interfaces";
import { RestaurantDocument } from "../../model/Restaurant";

export class RestaurantService implements IRestaurantService {
  private _repository = new RestaurantRepository();

  private mapToDTO(doc: RestaurantDocument): RestaurantResponseDTO {
    return {
      id: doc._id.toString(),
      name: doc.name,
      address: doc.address,
      cuisine: doc.cuisine,
      phone: doc.phone,
      email: doc.email,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  async getAll(): Promise<RestaurantResponseDTO[]> {
    const restaurants = await this._repository.findAll();
    return restaurants.map((r) => this.mapToDTO(r));
  }

  async create(data: CreateRestaurantDTO): Promise<RestaurantResponseDTO> {
    const restaurant = await this._repository.create(data);
    return this.mapToDTO(restaurant);
  }

  async update(id: string, data: CreateRestaurantDTO): Promise<RestaurantResponseDTO | null> {
    const restaurant = await this._repository.update(id, data);
    return restaurant ? this.mapToDTO(restaurant) : null;
  }

  async delete(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}
