import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { suppliersColumns } from "../../utils/datatableColumns";
import { useGetSuppliers } from "../../services";
import "./datatable.scss";

const ListSuppliers = () => {
  const initialData = useGetSuppliers();
  const [data, setData] = useState([]);

  useMemo(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách sản phẩm</div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={suppliersColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ListSuppliers;
