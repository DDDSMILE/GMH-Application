import { DishesModel } from "../models/dishes.model.js";
import { UserModel } from "../models/user.model.js";
import { commonFoods } from "../utils/constants.js";
import { sendChatGPT } from "../utils/sendChatGPT.js";
import { sendSMS } from "../utils/sendSMS.js";
import { sendToken } from "../utils/sendToken.js";
import { SuppliersModel } from "../models/suppliers.model.js";
import cloudinary from "cloudinary";
import fs from "fs";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { name, phone_number, address, password } = req.body;

    // const avatar = req.files.avatar.tempFilePath;

    let user = await UserModel.findOne({ name });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const otp = Math.floor(Math.random() * 10000);

    // expiry otp = 5*60*1000 (ms)
    user = await UserModel.create({
      name,
      phone_number,
      password,
      address,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRY * 60 * 1000),
    });

    // await sendSMS(phone_number, "Verify your account by OTP", otp);

    sendToken(
      res,
      user,
      201,
      "OTP sent to your phone number, please verify your account"
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* VERIFY */
export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);
    console.log(otp);
    const user = await UserModel.findById(req.body.user._id);
    console.log(user);

    if (user.otp !== otp || user.otp_expiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been expired" });
    } else {
      user.verified = true;
      user.otp = null;
      user.otp_expiry = null;
    }

    await user.save();

    sendToken(res, user, 200, "Account Verified");
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const user = await UserModel.findOne({ name }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Username or Password" });
    }

    sendToken(res, user, 200, "Login Successful");
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
    const user = await UserModel.findById(req.user._id);

    sendToken(res, user, 201, `Welcome back ${user.name}`);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const { name } = req.body;
    const avatar = req.files.avatar.tempFilePath;

    if (name) user.name = name;
    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const mycloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "users",
      });

      fs.rmSync("./tmp", { recursive: true });

      user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }

    await user.save();

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
    const user = await UserModel.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Old Password" });
    }

    user.password = newPassword;

    await user.save();

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

    const user = await UserModel.findOne({ phone_number });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Phone Number" });
    }

    const otp = Math.floor(Math.random() * 10000);

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 3600000; // 1 hours expire

    await user.save();

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

    const user = await UserModel.findOne({
      resetPasswordOtp: otp,
      resetPasswordOtpExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Otp Invalid or has been expired" });
    }

    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: `Password Changed Successfully` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* CHATGPT */
export const answerChatGPT = async (req, res) => {
  try {
    const message = req.body.question;

    const answer = await sendChatGPT(message);

    const matchingKeywords = commonFoods.filter((food) => {
      const regex = new RegExp(
        food.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
        "i"
      );
      return answer.match(regex);
    });

    const results = [];

    for (let k of matchingKeywords) {
      try {
        const result = await DishesModel.findOne({
          name: { $regex: k, $options: "i" },
          type: { $ne: "khác" },
        }).exec();
        if (result) {
          const { address } = await SuppliersModel.findOne({
            name: { $regex: result.name_supplier, $options: "i" },
          }).exec();
          const createOrder = {
            item: { ...result._doc, addressItem: address },
          };
          results.push(createOrder);
        }
      } catch (error) {
        console.log(error);
      }
    }

    res.status(201).json({
      success: true,
      answer: answer,
      products: results,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
