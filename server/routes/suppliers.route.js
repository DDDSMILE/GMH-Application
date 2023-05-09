import express from "express";
import { getAllSuppliers, getSupplier } from "../controllers/suppliers.controller.js";

const router = express.Router();

router.get("/", getAllSuppliers);

router.get("/:id", getSupplier);

export default router;
