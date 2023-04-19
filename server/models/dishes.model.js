import mongoose from "mongoose";

const DishesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
  },
  supplierId: {
    type: String,
  },
});

export const DishesModel = mongoose.model("Dishes", DishesSchema);
