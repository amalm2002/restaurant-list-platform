import { Request, Response } from "express";
import { IRestaurantController } from "../interfaces/restaurant.controller.interfaces";
import { IRestaurantService } from "../../service/interfaces/restaurant.service.interfaces";
import { STATUS_CODE } from "../../constants/status.code.constant";
import { MESSAGE } from "../../constants/message.constants";

export class RestaurantController implements IRestaurantController {

    constructor(private _service: IRestaurantService) { }

    async getAll(_: Request, res: Response): Promise<Response> {
        try {
            const data = await this._service.getAll();
            return res.status(STATUS_CODE.OK).json({
                success: true,
                data,
            });
        } catch (error: any) {
            return res.status(STATUS_CODE.SERVER_ERROR).json({
                success: false,
                message: MESSAGE.INTERNAL_ERROR,
            });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this._service.create(req.body);
            return res.status(STATUS_CODE.CREATED).json({
                success: true,
                message: MESSAGE.RESTAURANT_CREATED,
                data,
            });
        } catch (error: any) {
            return res.status(STATUS_CODE.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this._service.update(req.params.id, req.body);
            return res.status(STATUS_CODE.OK).json({
                success: true,
                message: MESSAGE.RESTAURANT_UPDATION,
                data,
            });
        } catch (error: any) {
            const status =
                error.message === MESSAGE.RESTAURANT_NOT_FOUND
                    ? STATUS_CODE.NOT_FOUND
                    : STATUS_CODE.BAD_REQUEST;

            return res.status(status).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this._service.delete(req.params.id);
            return res.status(STATUS_CODE.NO_CONTENT).send();
        } catch (error: any) {
            return res.status(STATUS_CODE.NOT_FOUND).json({
                success: false,
                message: error.message,
            });
        }
    }
}
