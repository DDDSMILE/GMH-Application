import { useEffect, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { dishesColumns } from "../../utils/datatableColumns";
import { ToastContainer, toast } from "react-toastify";
import gmh from "../../gmh";

const ListDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(true);
  useEffect(() => {
    const fetchDishes = async () => {
      setIsDataFetched(true);
      const { dishes } = await gmh.getDishes();
      let dish = [];
      dish = dishes.map((d) => ({
        id: d._id,
        ...d,
      }));
      setDishes(dish);
      setIsDataFetched(false);
      toast.dismiss();
      toast.success("Đã tải xong");
    };
    fetchDishes();
  }, []);

  if (isDataFetched) {
    toast.loading("Loading data...");
  }

  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">Danh sách sản phẩm</div>
      <DataGrid
        className="datagrid"
        rows={dishes}
        columns={dishesColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ListDishes;
