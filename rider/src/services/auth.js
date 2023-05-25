import axios from "axios";
import { storeData } from "../utils/asyncStorage";
const API_URL = "http://10.0.2.2:3001/api/v1/shipper";

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

export const getUser = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/me`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
