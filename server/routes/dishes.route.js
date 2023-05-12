import express from "express";
import {
  getDish,
  getDishesWithPaginate,
  searchDish,
} from "../controllers/dishes.controller.js";

const router = express.Router();

/* http://localhost:3001/api/v1/dishes/type=all/page/10/min=&max=/sort=/search= */
/* GET DISHES */
router.get(
  "/type=:type/page/:page/min=:min?&max=:max?/sort=:sort?/search=:search?",
  getDishesWithPaginate
);

/* http://localhost:3001/api/v1/dishes/search/%C4%90%E1%BA%ADu%20Ph%E1%BB%99ng%20V%E1%BB%8B%20BBQ */
/* SEARCH DISHES */
// router.get("/search/:search", searchDish);

/* GET DISH */
router.get("/:id", getDish);

export default router;
