import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/suppliers";

export const getSupplier = async ({ name_supplier }) => {
  try {
    const { data } = await axios.get(`${API_URL}/${name_supplier}`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
