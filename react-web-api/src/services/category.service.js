import axios from "axios";

const CAT_API_BASE_URL = "http://localhost:8080/api/cat/category";

class CategoryServices {
  getCat() {
    return axios.get(CAT_API_BASE_URL);
  }

  createCat(category) {
    return axios.post(CAT_API_BASE_URL, category);
  }

  getCatById(categoryId) {
    return axios.get(CAT_API_BASE_URL + "/" + categoryId);
  }

  updateCat(category, categoryId) {
    return axios.put(CAT_API_BASE_URL + "/" + categoryId, category);
  }

  deleteCat(categoryId) {
    return axios.delete(CAT_API_BASE_URL + "/" + categoryId);
  }
}

export default new CategoryServices();
