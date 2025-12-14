import RestaurantModel from "../../model/Restaurant";
import { CreateRestaurantDTO } from "../../dto/restaurant.dto";
import { IRestaurantRepository } from "../interfaces/restaurant.repository.interfaces";


export class RestaurantRepository implements IRestaurantRepository {
    async findAll() {
        return RestaurantModel.find();
    }

    async create(data: CreateRestaurantDTO) {
        return RestaurantModel.create(data);
    }

    async update(id: string, data: CreateRestaurantDTO) {
        return RestaurantModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        await RestaurantModel.findByIdAndDelete(id);
    }
}
