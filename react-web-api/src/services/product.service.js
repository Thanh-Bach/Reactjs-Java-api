import axios from "axios";

const PRD_API_BASE_URL = "http://localhost:8080/api/prd/products";
const API_BASE_URL = "http://localhost:8080/api/prd/productdetail";

class PrdServices {
  getPrd() {
    return axios.get(PRD_API_BASE_URL);
  }

  createPrd(products) {
    return axios.post(PRD_API_BASE_URL, products);
  }

  getPrdById(productsId) {
    return axios.get(API_BASE_URL + "/" + productsId);
  }

  updatePrd(products, productsId) {
    return axios.put(PRD_API_BASE_URL + "/" + productsId, products);
  }

  deletePrd(productsId) {
    return axios.delete(PRD_API_BASE_URL + "/" + productsId);
  }
}

export default new PrdServices();
