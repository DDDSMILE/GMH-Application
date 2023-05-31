import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/orders";

export const getAllOrder = async () => {
  try {
    const { data } = await axios.get(`${API_URL}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOrdersFromShipper = async (shipper_id) => {
  try {
    const { data } = await axios.get(`${API_URL}/shipper/${shipper_id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const acceptOrder = async (order) => {
  try {
    const { data } = await axios.post(`${API_URL}/shipper/accept_order`, order);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const doneOrder = async ({ orderId }) => {
  try {
    const { data } = await axios.post(`${API_URL}/shipper/done_order`, {
      orderId,
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
