import ListShippers from "../../components/List/ListShippers";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dishes.scss";

const Shippers = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <ListShippers />
      </div>
    </div>
  );
};

export default Shippers;
