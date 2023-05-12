import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/user";

export const chatgpt = async ({ question }) => {
  try {
    const { data } = await axios.post(`${API_URL}/chatgpt`, { question });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
