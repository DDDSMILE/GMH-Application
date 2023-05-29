import express from "express";
import {
  createShipper,
  forgetPassword,
  getAllShippers,
  login,
  logout,
  resetPassword,
  updateProfileShipper,
  getShipper,
  deleteShipper,
} from "../controllers/admin.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

import multer from "multer";

const router = express.Router();

// Cấu hình Multer để lưu trữ tệp tin tạm thời
const storage = multer.diskStorage({
  destination: "tmp/",
  filename: (req, file, callback) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage });

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/forgetpassword").post(forgetPassword);

router.route("/resetpassword").put(resetPassword);

/* CRUD SHIPPERS */
router.route("/all_shippers").get(getAllShippers);

router.route("/get_shipper/:id").get(getShipper);

router.route("/delete_shipper/:id").delete(deleteShipper);

router.route("/create_shipper").post(upload.single("avatar"), createShipper);

router
  .route("/updated_shipper/:id")
  .post(upload.single("avatar"), updateProfileShipper);

export default router;
