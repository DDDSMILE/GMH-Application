import express from "express";
import { create } from "../controllers/shipper.controller.js";

const router = express.Router();

router.route("/create").post(create);

export default router;
