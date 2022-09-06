package com.spring.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.exception.ResourceNotFoundException;
import com.spring.api.model.Cart;
import com.spring.api.repository.CartRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart/")
public class CartController {

	@Autowired
	private CartRepository cartRepository;

	@GetMapping("/cart")
	public List<Cart> getAllCart() {
		return cartRepository.findAll();
	}

	@PostMapping("/cart")
	public Cart createCart(@RequestBody Cart cart) {
		return cartRepository.save(cart);
	}

	@GetMapping("/cart/{id}")
	public ResponseEntity<Cart> getCartById(@PathVariable Long id) {
		Cart cart = cartRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("cart not exist with id :" + id));
		return ResponseEntity.ok(cart);
	}

	@PutMapping("/cart/{id}")
	public ResponseEntity<Cart> updateCart(@PathVariable Long id, @RequestBody Cart cartDetails) {
		Cart cart = cartRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("cart not exist with id :" + id));

		cart.setTen(cartDetails.getTen());
		cart.setDongia(cartDetails.getDongia());
		cart.setSoluong(cartDetails.getSoluong());
		Cart updatedCart = cartRepository.save(cart);
		return ResponseEntity.ok(updatedCart);
	}

	@DeleteMapping("/cart/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCart(@PathVariable Long id) {
		Cart cart = cartRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("cart not exist with id :" + id));

		cartRepository.delete(cart);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	///
	@DeleteMapping("/cart")
	public ResponseEntity<Map<String, Boolean>> deleteAllCart() {
		cartRepository.deleteAll();
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	

}
