import { Request, Response } from "express";
import { RestaurantService } from "../../service/implementations/restaurant.service";

const service = new RestaurantService();

export const getRestaurants = async (_: Request, res: Response) => {
    const data = await service.getAll();
    res.json({ success: true, data });
};

export const createRestaurant = async (req: Request, res: Response) => {
    console.log('data is getting :', req.body)
    const data = await service.create(req.body);
    res.status(201).json({ success: true, data });
};

export const updateRestaurant = async (req: Request, res: Response) => {
    const data = await service.update(req.params.id, req.body);
    res.json({ success: true, data });
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    await service.delete(req.params.id);
    res.status(204).send();
};
