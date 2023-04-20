import { SuppliersModel } from "../models/suppliers.model.js";

export const getSupplier = async (req, res) => {
  try {
    const id = req.params.id;
    const supplier = await SuppliersModel.find({ id: id });
    res
      .status(200)
      .json({ success: true, message: "Done", supplier: supplier });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
