import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/shipper";

export const changeAddress = async (address) => {
  try {
    const { data } = await axios.put(`${API_URL}/change_address`, address);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changePhoneNumber = async (phoneNumber) => {
  try {
    const { data } = await axios.put(`${API_URL}/update_profile`, phoneNumber);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changePassword = async (newPassword) => {
  try {
    const { data } = await axios.put(`${API_URL}/update_password`, newPassword);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
