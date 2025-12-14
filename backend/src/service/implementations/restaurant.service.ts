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
    const { name, address, cuisine, phone, email } = data;

    if (!name || !address || !cuisine || !phone || !email) {
      throw new Error("All fields are required");
    }

    const existing = await this._repository.findByEmailOrPhone(email, phone);
    if (existing) {
      if (existing.email === email) {
        throw new Error("Email already exists");
      }
      if (existing.phone === phone) {
        throw new Error("Phone number already exists");
      }
    }

    const restaurant = await this._repository.create(data);
    return this.mapToDTO(restaurant);
  }

  async update(id: string, data: CreateRestaurantDTO): Promise<RestaurantResponseDTO | null> {
    const { name, address, cuisine, phone, email } = data;

    if (!name || !address || !cuisine || !phone || !email) {
      throw new Error("All fields are required");
    }

    const duplicate = await this._repository.findDuplicateForUpdate(
      id,
      email,
      phone
    );
    console.log(duplicate, 'dupppppp')
    if (duplicate) {
      if (duplicate.email === email) {
        throw new Error("Email already exists");
      }
      if (duplicate.phone === phone) {
        throw new Error("Phone number already exists");
      }
    }

    const restaurant = await this._repository.update(id, data);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    return this.mapToDTO(restaurant);
  }


  async delete(id: string): Promise<void> {
    await this._repository.delete(id);
  }
}
