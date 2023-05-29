import Sidebar from "../sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import styled from "@emotion/styled";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./updated.scss";
import { useParams } from "react-router-dom";
import gmh from "../../gmh";

// Styled components
const StyledForm = styled(Form)`
  max-width: "100%";
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorText = styled(ErrorMessage)`
  color: red;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const DropzoneContainer = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const convertAddressToCoordinates = async (address) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbGk2dmt6bmczZzNiM2VudGRkc2xhY2dxIn0.j5FbXoxE7wJOwi9STKSLBw&limit=1`
    );
    const data = await response.json();
    if (data.features.length > 0) {
      const { center } = data.features[0];
      return { lat: center[1], lng: center[0] };
    }
    return null;
  } catch (error) {
    console.error("Error converting address to coordinates:", error);
    return null;
  }
};

const Updated = () => {
  const { shipperId } = useParams();
  const [shipper, setShipper] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await gmh.getShipperById({ shipperId });
      setShipper(data[0]);
      setIsDataFetched(true);
    };
    fetchData();
  }, [shipperId]);

  const initialValues = {
    name: shipper.name || "",
    username: shipper.username || "",
    password: "",
    phone_number: shipper.phone_number?.slice(3) || "",
    address: shipper.address || "",
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      setImageAvatar(acceptedFiles[0]);
      setSelectedImage(URL.createObjectURL(image));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: handleImageDrop,
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên là bắt buộc"),
    username: Yup.string().required("Tên người dùng là bắt buộc"),
    password: Yup.string()
      .matches(/^\S*$/, "Mật khẩu không được chứa khoảng trắng")
      .matches(/^(?=.*[A-Z]).*$/, "Mật khẩu phải có ít nhất một ký tự chữ hoa")
      .matches(
        /^(?=.*[a-z]).*$/,
        "Mật khẩu phải có ít nhất một ký tự chữ thường"
      )
      .matches(/^(?=.*[0-9]).*$/, "Mật khẩu phải chứa ít nhất một chữ số")
      .matches(
        /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/,
        "Mật khẩu phải chứa ít nhất một kí hiệu đặt biệt"
      )
      .matches(/^.{8,24}$/, "Mật khẩu phải dài từ 8 đến 24 ký tự")
      .required("Mật khẩu là bắt buộc"),
    phone_number: Yup.string()
      .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    address: Yup.string().required("Địa chỉ là bắt buộc"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { lat, lng } = await convertAddressToCoordinates(values.address);
    const updatedValues = {
      ...values,
      lat: lat,
      lng: lng,
      phone_number: `+84${values.phone_number}`,
    };
    const formData = new FormData();

    formData.append("avatar", imageAvatar);

    Object.entries(updatedValues).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await axios.post(
        `http://localhost:3001/api/v1/admin/updated_shipper/${shipperId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Sửa thành công");
    } catch (error) {
      toast.error("Tên người dùng trùng");
      throw new Error(error.message);
    }
  };

  if (!isDataFetched) {
    return <div>Loading...</div>; // Hiển thị loading khi đang lấy dữ liệu
  }

  return (
    <div className="new">
      <ToastContainer />
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1>Chỉnh sửa</h1>
        </div>
        <div className="bottom">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <StyledForm>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div style={{ padding: 70 }}>
                  <Label htmlFor="avatar">Ảnh đại diện</Label>
                  <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    ) : (
                      <img
                        src={shipper.avatar.url}
                        alt="cloud-img"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    )}
                  </DropzoneContainer>
                  <ErrorText name="avatar" component="div" />
                </div>
                <div style={{ width: 300 }}>
                  <FormGroup>
                    <Label htmlFor="name">Tên đăng nhập</Label>
                    <Input type="text" id="name" name="name" />
                    <ErrorText name="name" component="div" />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="username">Tên người dùng</Label>
                    <Input type="text" id="username" name="username" />
                    <ErrorText name="username" component="div" />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Input type="password" id="password" name="password" />
                    <ErrorText name="password" component="div" />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone_number">Số điện thoại</Label>
                    <Input type="text" id="phone_number" name="phone_number" />
                    <ErrorText name="phone_number" component="div" />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="address">Địa chỉ liên lạc</Label>
                    <Input type="text" id="address" name="address" />
                    <ErrorText name="address" component="div" />
                  </FormGroup>
                </div>
              </div>

              <SubmitButton type="submit">Thay đổi</SubmitButton>
            </StyledForm>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Updated;
