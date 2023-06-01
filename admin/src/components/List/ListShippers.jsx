import { useMemo, useState } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { shippersColumn } from "../../utils/datatableColumns";
import { Link } from "react-router-dom";
import { useGetAllShipper } from "../../services";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ListShippers = () => {
  const ShippersData = useGetAllShipper();
  const [data, setData] = useState("");

  useMemo(() => {
    setData(ShippersData);
  }, [ShippersData]);

  const handleDelete = async (id) => {
    setData(data.filter((item) => item.id !== id));
    try {
      await axios.delete(
        `http://localhost:3001/api/v1/admin/delete_shipper/${id}`
      );
      toast.success("Xóa thành công!");
    } catch (error) {
      toast.error("Xóa thất bại");
      throw new Error(error.message);
    }
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
              <div className="viewButton">Xem thông tin</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">Danh sách người giao hàng</div>
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
