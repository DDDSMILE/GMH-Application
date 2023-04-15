import { UserModel } from "../models/user.model.js";
import { sendSMS } from "../utils/sendSMS.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
  try {
    const { name, phone_number, password } = req.body;

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
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRY * 60 * 1000),
    });

    // await sendSMS(phone_number, "Verify your account by OTP", otp);

    sendToken(
      res,
      user,
      200,
      "OTP sent to your phone number, please verify your account"
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const otp = Number(req.body.otp);

    const user = await UserModel.findById(req.user._id);
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
