import { useEffect, useState } from "react";
import gmh from "../gmh";

export const useGetDishes = () => {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    const fetchDishes = async () => {
      const { dishes } = await gmh.getDishes();
      let dish = [];
      dish = dishes.map((d) => ({
        id: d._id,
        ...d,
      }));
      setDishes(dish);
    };
    fetchDishes();
  }, []);
  return dishes;
};

export const useGetSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await gmh.getSuppliers();
      let supplier = [];
      supplier = data.map((d) => ({
        id: d._id,
        ...d,
      }));
      setSuppliers(supplier);
    };
    fetchSuppliers();
  }, []);
  return suppliers;
};

export const useGetAllShipper = () => {
  const [shippers, setShippers] = useState([]);
  useEffect(() => {
    const fetchShippers = async () => {
      const { data } = await gmh.getAllShippers();
      console.log(data);
      let shipper = [];
      shipper = data.map((d) => ({
        id: d._id,
        ...d,
      }));
      setShippers(shipper);
    };
    fetchShippers();
  }, []);
  return shippers;
};
