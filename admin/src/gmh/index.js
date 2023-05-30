import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

class GMH_API {
  async getDishes() {
    const { data } = await axios.get(
      `${API_URL}/dishes/type=all/page/all/min=&max=/sort=/search=`
    );
    return data;
  }

  async getSuppliers() {
    const { data } = await axios.get(`${API_URL}/suppliers`);
    return data;
  }

  async getAllShippers() {
    const { data } = await axios.get(`${API_URL}/admin/all_shippers`);
    return data;
  }

  async getShipperById({ shipperId }) {
    const { data } = await axios.get(
      `${API_URL}/admin/get_shipper/${shipperId}`
    );
    return data;
  }

  async createShipper(formData) {
    await axios.post(`${API_URL}/admin/create_shipper`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async deleteShipperById({ shipperId }) {
    const { data } = await axios.delete(
      `${API_URL}/admin/delete_shipper/${shipperId}`
    );
    return data;
  }
}

const GMHAPI = new GMH_API();

export default GMHAPI;
