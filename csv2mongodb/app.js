const express = require("express");
const mongoose = require("mongoose");
const SuppliersModel = require("./models/Suppliers");
const DishesModel = require("./models/Dishes");

const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.use(express.json({ limit: "50mb" }));

app.post("/import", async (req, res) => {
  try {
    const jsonData = req.body; // assuming the JSON data is sent in the request body

    // Check if jsonData is an array
    if (!Array.isArray(jsonData)) {
      throw new Error("JSON data must be an array");
    }

    // Insert the converted data into the database
    const result = await DishesModel.insertMany(jsonData);

    res.json(result);
  } catch (err) {
    console.error("Failed to import JSON data:", err);
    res.status(500).json({ error: "Failed to import JSON data" });
  }
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
