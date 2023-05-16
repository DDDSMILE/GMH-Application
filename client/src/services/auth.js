import axios from "axios";
import { storeData } from "../utils/asyncStorage";
const API_URL = "http://10.0.2.2:3001/api/v1/user";

export const login = async ({ name, password }) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/login`,
      { name, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async ({ name, password, phone_number, address }) => {
  try {
    const { data } = await axios.post(`${API_URL}/register`, {
      name,
      password,
      phone_number,
      address,
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifyOtp = async (otp, { user }) => {
  try {
    const { data } = await axios.post(`${API_URL}/verify`, { otp, user });
    storeData("user", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
