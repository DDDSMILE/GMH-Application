import cloudinary from "cloudinary";
import fs from "fs";
import { ShipperModel } from "../models/shipper.model.js";
import { sendToken } from "../utils/sendToken.js";
import { sendSMS } from "../utils/sendSMS.js";
import { UserModel } from "../models/user.model.js";

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const shipper = await ShipperModel.findOne({ name }).select("+password");

    if (!shipper) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    const isMatch = await shipper.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    sendToken(res, shipper, 200, "Login Successful");
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

/* GET MY PROFILE */
export const getMyProfile = async (req, res) => {
  try {
    const shipper = await ShipperModel.findById(req.shipper._id);

    sendToken(res, shipper, 201, `Welcome back ${shipper.name}`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const shipper = await ShipperModel.findById(req.shipper._id);

    const { name } = req.body;
    const avatar = req.files.avatar.tempFilePath;

    if (name) shipper.name = name;
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

/* UPDATE PASSWORD */
export const updatePassword = async (req, res) => {
  try {
    const shipper = await ShipperModel.findById(req.shipper._id).select(
      "+password"
    );

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const isMatch = await shipper.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Old Password" });
    }

    shipper.password = newPassword;

    await shipper.save();

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
    const { phone_number } = req.body;

    const shipper = await ShipperModel.findOne({ phone_number });

    if (!shipper) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Phone Number" });
    }

    const otp = Math.floor(Math.random() * 10000);

    shipper.resetPasswordOtp = otp;
    shipper.resetPasswordOtpExpiry = Date.now() + 3600000; // 1 hours expire

    await shipper.save();

    // await sendSMS(phone_number, "Your OTP for reset the password", otp);

    res
      .status(200)
      .json({ success: true, message: `OTP sent to ${phone_number}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;

    const shipper = await ShipperModel.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    });

    if (!shipper) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been expired" });
    }

    shipper.password = newPassword;
    shipper.resetPasswordOtp = null;
    shipper.resetPasswordOtpExpiry = null;
    await shipper.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* GET USER */
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
