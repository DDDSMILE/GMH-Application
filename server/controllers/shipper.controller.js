import cloudinary from "cloudinary";
import fs from "fs";
import { ShipperModel } from "../models/shipper.model.js";

/* CREATE */
export const create = async (req, res) => {
  try {
    const { name, username, phone_number, password } = req.body;

    const avatar = req.files.avatar.tempFilePath;

    let shipper = await ShipperModel.findOne({ name });
    if (shipper) {
      return res
        .status(400)
        .json({ success: true, message: "Shipper already exists" });
    }

    const mycloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "shipper",
    });

    fs.rmSync("./tmp", { recursive: true });

    shipper = await ShipperModel.create({
      name,
      username,
      password,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
