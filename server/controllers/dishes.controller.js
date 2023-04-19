import { DishesModel } from "../models/dishes.model.js";

export const getDishesWithPaginate = async (req, res) => {
  try {
    const page = req.params;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const dishes = await DishesModel.find().limit(pageSize).skip(offset);
    res.status(200).json({ success: true, message: "Done", dishes: dishes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
