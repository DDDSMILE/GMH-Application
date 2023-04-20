import express from "express";
import { getSupplier } from "../controllers/suppliers.controller.js";

const router = express.Router();

router.get("/:id", getSupplier);

export default router;
