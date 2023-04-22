import cloudinary from "cloudinary";
import fs from "fs";
import { ShipperModel } from "../models/shipper.model.js";
import { AdminModel } from "../models/admin.model.js";
import { sendToken } from "../utils/sendToken.js";
import { sendMail } from "../utils/sendMail.js";

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const admin = await AdminModel.findOne({ name }).select("+password");

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    sendToken(res, admin, 200, "Login Successful");
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* LOGOUT */
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE PASSWORD */
export const updatePassword = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.admin._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const isMatch = await admin.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Old Password" });
    }

    admin.password = newPassword;

    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Password Updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* FORGET PASSWORD */
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    const otp = Math.floor(Math.random() * 10000);

    admin.resetPasswordOtp = otp;
    admin.resetPasswordOtpExpiry = Date.now() + 3600000; // 1 hours expire

    await admin.save();

    const message = `Your OTP for reset the password ${otp}.If you did not request for this, please ignore this email.`;
    await sendMail(email, "Request for reset password", message);

    res.status(200).json({ success: true, message: `OTP sent to ${email}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const admin = await AdminModel.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been expired" });
    }

    admin.password = newPassword;
    admin.resetPasswordOtp = null;
    admin.resetPasswordOtpExpiry = null;
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* SHIPPERS */
export const getAllShippers = async (req, res) => {
  try {
    const shippers = await ShipperModel.find({});

    res
      .status(200)
      .json({ success: true, message: "done", shippers: shippers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getShipper = async (req, res) => {
  try {
    const id = req.params.id;

    const shipper = await ShipperModel.find({ _id: id });
    res.status(200).json({ success: true, message: "done", shipper: shipper });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteShipper = async (req, res) => {
  try {
    const id = req.params.id;

    await ShipperModel.findByIdAndDelete({ _id: id });

    res.status(200).json({ success: true, message: "delete shipper" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createShipper = async (req, res) => {
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
      phone_number,
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

export const updateProfileShipper = async (req, res) => {
  try {
    const shipper = await ShipperModel.findById(req.shipper._id);

    const { name, user_name, phone_number, password, address } = req.body;
    const avatar = req.files.avatar.tempFilePath;

    if (name) shipper.name = name;
    if (user_name) shipper.user_name = user_name;
    if (phone_number) shipper.phone_number = phone_number;
    if (password) shipper.password = password;
    if (address) shipper.address = address;

    if (avatar) {
      await cloudinary.v2.uploader.destroy(shipper.avatar.public_id);

      const mycloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "shippers",
      });

      fs.rmSync("./tmp", { recursive: true });

      shipper.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }

    await shipper.save();

    res
      .status(200)
      .json({ success: true, message: "Profile Updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
