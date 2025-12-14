import { RestaurantRepository } from "../../repository/implementations/restaurant.repository";
import { CreateRestaurantDTO } from "../../dto/restaurant.dto";

export class RestaurantService {
  private repository = new RestaurantRepository();

  getAll() {
    return this.repository.findAll();
  }

  create(data: CreateRestaurantDTO) {
    return this.repository.create(data);
  }

  update(id: string, data: CreateRestaurantDTO) {
    return this.repository.update(id, data);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
