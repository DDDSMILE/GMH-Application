import { useMemo, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { dishesColumns } from "../../utils/datatableColumns";
import { useGetDishes } from "../../services";

const ListDishes = () => {
  const DishesData = useGetDishes();
  const [data, setData] = useState("");

  useMemo(() => {
    setData(DishesData);
  }, [DishesData]);

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách sản phẩm</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={dishesColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ListDishes;
