import axios from "axios";
const API_URL = "http://10.0.2.2:3001/api/v1/dishes";

export const getDishes = async ({
  typeProduct,
  currentPage,
  searchText,
  minPrice,
  maxPrice,
  sortOrder,
}) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/type=${typeProduct}/page/${currentPage}/min=${minPrice}&max=${maxPrice}/sort=${sortOrder}/search=${searchText}`
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
