import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dishes" style={{ textDecoration: "none" }}>
          <span className="logo">iMarket</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Danh sách</p>
          <Link to="/dishes" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="/suppliers" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Đại lý</span>
            </li>
          </Link>
          <Link to="/shippers" style={{ textDecoration: "none" }}>
            <li>
              <Diversity1Icon className="icon" />
              <span>Nhân viên</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
