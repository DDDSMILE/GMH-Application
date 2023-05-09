import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1'

class GMHAPI {
    async getDishes() {
        const { data } = await axios.get(`${API_URL}/dishes/type=all/page/all/min=&max=/sort=`)
        return data
    }

    async getSuppliers() {
        const { data } = await axios.get(`${API_URL}/suppliers`)
        return data
    }
}

export default new GMHAPI();