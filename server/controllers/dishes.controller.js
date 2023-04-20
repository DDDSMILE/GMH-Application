import { DishesModel } from "../models/dishes.model.js";

export const getDishesWithPaginate = async (req, res) => {
  try {
    // Get data from database according to page value
    const page = req.params.page || 1;
    const productType = decodeURIComponent(req.params.type);
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    // Get data from database according to (min,max) price
    const minPrice = req.params.min || 0;
    const maxPrice = req.params.max || Infinity;

    // Get data from database according to (asc, desc) price
    const sortDishes = req.params.sort || "asc";
    const sortParam = sortDishes === "asc" ? { price: 1 } : { price: -1 };

    let dishes = [];
    if (productType === "all") {
      dishes = await DishesModel.find({
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .limit(pageSize)
        .skip(offset)
        .sort(sortParam);
    } else {
      dishes = await DishesModel.find({
        type: productType,
        price: { $gte: minPrice, $lte: maxPrice },
      })
        .limit(pageSize)
        .skip(offset)
        .sort(sortParam);
    }

    res.status(200).json({ success: true, message: "Done", dishes: dishes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const searchDish = async (req, res) => {
  try {
    const search = decodeURIComponent(req.params.search);
    const dishes = await DishesModel.find({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json({ success: true, message: "Done", dishes: dishes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDish = async (req, res) => {
  try {
    const id = req.params.id;
    const dish = await DishesModel.find({ _id: id });
    res.status(200).json({ success: true, message: "Done", dish: dish });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
