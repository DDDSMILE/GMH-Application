import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/orders";

export const getOrdersFromUser = async (userId) => {
  try {
    const { data } = await axios.get(`${API_URL}/user/${userId}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post(`${API_URL}/create_orders`, order);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
