import { Router } from "express";
import { RestaurantController } from "../controller/implementations/restaurnt.controller";
import { RestaurantService } from "../service/implementations/restaurant.service";
import { RestaurantRepository } from "../repository/implementations/restaurant.repository";
import { IRestaurantController } from "../controller/interfaces/restaurant.controller.interfaces";

const router = Router();

const repository = new RestaurantRepository();
const service = new RestaurantService(repository);

const controller: IRestaurantController = new RestaurantController(service);

router.get("/restaurants", (req, res) => controller.getAll(req, res));
router.post("/restaurants", (req, res) => controller.create(req, res));
router.put("/restaurants/:id", (req, res) => controller.update(req, res));
router.delete("/restaurants/:id", (req, res) => controller.delete(req, res));

export default router;
