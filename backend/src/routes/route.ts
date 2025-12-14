import { Router } from "express";
import { RestaurantController } from "../controller/implementations/restaurnt.controller";

const router = Router();
const controller = new RestaurantController();

router.get("/restaurants", controller.getAll.bind(controller));
router.post("/restaurants", controller.create.bind(controller));
router.put("/restaurants/:id", controller.update.bind(controller));
router.delete("/restaurants/:id", controller.delete.bind(controller));

export default router;
