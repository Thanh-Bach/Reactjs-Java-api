import axios from "axios";

const ORDERDETAIL_API_BASE_URL =
  "http://localhost:8080/api/orderdetail/orderdetail";

class OrderDetailServices {
  getOrderDetail() {
    return axios.get(ORDERDETAIL_API_BASE_URL);
  }

  createOrderDetail(orderDetail) {
    return axios.post(ORDERDETAIL_API_BASE_URL, orderDetail);
  }

  getOrderDetailById(orderDetailId) {
    return axios.get(ORDERDETAIL_API_BASE_URL + "/" + orderDetailId);
  }

  updateOrderDetail(orderDetail, orderDetailId) {
    return axios.put(
      ORDERDETAIL_API_BASE_URL + "/" + orderDetailId,
      orderDetail
    );
  }

  deleteOrderDetail(orderDetailId) {
    return axios.delete(ORDERDETAIL_API_BASE_URL + "/" + orderDetailId);
  }
}

export default new OrderDetailServices();
