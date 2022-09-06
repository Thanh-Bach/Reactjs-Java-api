import axios from "axios";

const CART_API_BASE_URL = "http://localhost:8080/api/cart/cart";

class CartService {
  getCart() {
    return axios.get(CART_API_BASE_URL);
  }

  createCart(cart) {
    return axios.post(CART_API_BASE_URL, cart);
  }

  getCartById(cartId) {
    return axios.get(CART_API_BASE_URL + "/" + cartId);
  }

  updateCart(cart, cartId) {
    return axios.put(CART_API_BASE_URL + "/" + cartId, cart);
  }

  deleteCart(cartId) {
    return axios.delete(CART_API_BASE_URL + "/" + cartId);
  }
  deleteAllCart() {
    return axios.delete(CART_API_BASE_URL);
  }
}

export default new CartService();
