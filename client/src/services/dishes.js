import axios from "axios";
// http://localhost:3001/api/v1/dishes/type=all/page/10/min=&max=/sort=
const API_URL = "http://10.0.2.2:3001/api/v1/dishes";

export const getDishes = async (typeProduct, currentPage) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/type=${typeProduct}/page/${currentPage}/min=&max=/sort=`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
