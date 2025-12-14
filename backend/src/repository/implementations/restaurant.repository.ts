import RestaurantModel, {
    RestaurantDocument,
} from "../../model/Restaurant";
import { CreateRestaurantDTO } from "../../dto/restaurant.dto";
import { IRestaurantRepository } from "../interfaces/restaurant.repository.interfaces";

export class RestaurantRepository implements IRestaurantRepository {
    
    async findAll(): Promise<RestaurantDocument[]> {
        return RestaurantModel.find();
    }

    async create(data: CreateRestaurantDTO): Promise<RestaurantDocument> {
        return RestaurantModel.create(data);
    }

    async update(id: string, data: CreateRestaurantDTO): Promise<RestaurantDocument | null> {
        return RestaurantModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<void> {
        await RestaurantModel.findByIdAndDelete(id);
    }
}
