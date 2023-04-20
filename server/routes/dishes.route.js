import express from "express";
import { getDishesWithPaginate } from "../controllers/dishes.controller.js";

const router = express.Router();

// http://www.localhost:3001/api/v1/dishes/all/2/5000&25000/sort=
router.get("/:type?/:page?/:min?&:max?/:sort=?", getDishesWithPaginate);

export default router;
