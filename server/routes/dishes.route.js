import express from "express";
import { getDishesWithPaginate } from "../controllers/dishes.controller.js";

const router = express.Router();

router.get("/:page", getDishesWithPaginate);

export default router;
