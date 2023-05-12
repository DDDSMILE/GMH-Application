export const dishesColumns = [
  { field: "id", headerName: "Mã số sản phẩm", width: 170 },
  {
    field: "name",
    headerName: "Tên sản phẩm",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo} alt="product-img" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Giá tiền (VNĐ)",
    width: 150,
  },
  {
    field: "type",
    headerName: "Loại sản phẩm",
    width: 140,
  },
  {
    field: "name_supplier",
    headerName: "Đơn vị sản xuất",
    width: 400,
  },
];

export const suppliersColumns = [
  { field: "id", headerName: "Mã số nơi cung cấp", width: 170 },
  {
    field: "name",
    headerName: "Tên nơi cung cấp",
    width: 400,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.photo} alt="supplier-img" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 350,
  },
  {
    field: "open_time",
    headerName: "Thời gian mở cửa",
    width: 150,
  },
];

export const shippersColumn = [
  { field: "id", headerName: "Mã số nhân viên", width: 170 },
  {
    field: "name",
    headerName: "Tên nhân viên",
    width: 350,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.avatar.url}
            alt="product-img"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "phone_number",
    headerName: "Số điện thoại",
    width: 150,
  },
];
