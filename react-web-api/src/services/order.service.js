import axios from "axios";

const CAT_API_BASE_URL = "http://localhost:8080/api/ord/order";

class OrderServices {
  getOrd() {
    return axios.get(CAT_API_BASE_URL);
  }

  createOrd(order) {
    return axios.post(CAT_API_BASE_URL, order);
  }

  getOrdById(orderId) {
    return axios.get(CAT_API_BASE_URL + "/" + orderId);
  }

  updateOrd(order, orderId) {
    return axios.put(CAT_API_BASE_URL + "/" + orderId, order);
  }

  deleteOrd(orderId) {
    return axios.delete(CAT_API_BASE_URL + "/" + orderId);
  }
}

export default new OrderServices();
