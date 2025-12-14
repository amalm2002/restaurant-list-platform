import {
    CreateRestaurantDTO,
    RestaurantResponseDTO,
} from "../../dto/restaurant.dto";

export interface IRestaurantService {
    getAll(): Promise<RestaurantResponseDTO[]>;
    create(data: CreateRestaurantDTO): Promise<RestaurantResponseDTO>;
    update(id: string, data: CreateRestaurantDTO): Promise<RestaurantResponseDTO | null>;
    delete(id: string): Promise<void>;
}
