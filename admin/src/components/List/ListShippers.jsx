import { useMemo, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { shippersColumn } from "../../utils/datatableColumns";
import { Link } from "react-router-dom";
import { useGetAllShipper } from "../../services";

const ListShippers = () => {
  const ShippersData = useGetAllShipper();
  const [data, setData] = useState("");

  useMemo(() => {
    setData(ShippersData);
  }, [ShippersData]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Tác vụ",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/shippers/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Danh sách sản phẩm</div>
      <Link to="create" style={{ textDecoration: "none" }}>
        <div className="editButton">Thêm nhân viên</div>
      </Link>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={shippersColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ListShippers;
