import { DishesModel } from "../models/dishes.model.js";

export const getDishesWithPaginate = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const productType = decodeURIComponent(req.params.type);
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const minPrice = req.params.min || 0;
    const maxPrice = req.params.max || Infinity;
    const sortDishes = req.params.sort || "asc";

    const sortParam = sortDishes === "asc" ? { price: 1 } : { price: -1 };
    let dishes = [];
    if (productType === "all") {
      dishes = await DishesModel.find({
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .sort(sortParam)
        .limit(pageSize)
        .skip(offset);
    } else {
      dishes = await DishesModel.find({
        type: productType,
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .sort(sortParam)
        .limit(pageSize)
        .skip(offset);
    }

    res.status(200).json({ success: true, message: "Done", dishes: dishes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
