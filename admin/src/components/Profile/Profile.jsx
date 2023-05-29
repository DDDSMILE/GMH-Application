import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import { Link, useParams } from "react-router-dom";
import gmh from "../../gmh";

const Profile = () => {
  const { shipperId } = useParams();
  const [shipper, setShipper] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await gmh.getShipperById({ shipperId });
      setShipper(data[0]);
    };
    fetchData();
  }, [shipperId]);

  return (
    <div className="single">
      <Sidebar />
      {shipper ? (
        <div className="singleContainer">
          <div className="top">
            <div className="left">
              <Link to="updated" style={{ textDecoration: "none" }}>
                <div className="editButton">Edit</div>
              </Link>
              <h1 className="title">Thông tin của nhân viên:</h1>
              <div className="item">
                <img src={shipper?.avatar?.url} alt="" className="itemImg" />
                <div className="details">
                  <h1 className="itemTitle">{shipper.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Số điện thoại:</span>
                    <span className="itemValue">{shipper.phone_number}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Địa chỉ:</span>
                    <span className="itemValue">{shipper.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default Profile;
