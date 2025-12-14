import { Router } from "express";
import {
    getRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from "../controller/implementations/restaurnt.controller";

const router = Router();

router.get("/restaurants", getRestaurants);
router.post("/restaurants", createRestaurant);
router.put("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);

export default router;


