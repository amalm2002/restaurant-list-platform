import { Request, Response } from "express";
import { IRestaurantController } from "../interfaces/restaurant.controller.interfaces";
import { RestaurantService } from "../../service/implementations/restaurant.service";

export class RestaurantController implements IRestaurantController {
    private _service = new RestaurantService();

    async getAll(_: Request, res: Response): Promise<Response> {
        const data = await this._service.getAll();
        return res.status(200).json({
            success: true,
            data,
        });
    }

    async create(req: Request, res: Response): Promise<Response> {
        const data = await this._service.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            data,
        });
    }

    async update(req: Request, res: Response): Promise<Response> {
        const data = await this._service.update(req.params.id, req.body);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            data,
        });
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this._service.delete(req.params.id);
        return res.status(204).send();
    }
}
