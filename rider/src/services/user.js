import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/shipper";

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/get_user/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
