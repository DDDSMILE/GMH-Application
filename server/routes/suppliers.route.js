import express from "express";
import {
  getAllSuppliers,
  getSupplier,
} from "../controllers/suppliers.controller.js";

const router = express.Router();

router.get("/", getAllSuppliers);

router.get("/:name", getSupplier);

export default router;
