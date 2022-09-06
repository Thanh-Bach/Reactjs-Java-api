import axios from "axios";

const CAT_API_BASE_URL = "http://localhost:8080/api/brd/brand";

class BrandServices {
  getBrd() {
    return axios.get(CAT_API_BASE_URL);
  }

  createBrd(brand) {
    return axios.post(CAT_API_BASE_URL, brand);
  }

  getBrdById(brandId) {
    return axios.get(CAT_API_BASE_URL + "/" + brandId);
  }

  updateBrd(brand, brandId) {
    return axios.put(CAT_API_BASE_URL + "/" + brandId, brand);
  }

  deleteBrd(brandId) {
    return axios.delete(CAT_API_BASE_URL + "/" + brandId);
  }
}

export default new BrandServices();
