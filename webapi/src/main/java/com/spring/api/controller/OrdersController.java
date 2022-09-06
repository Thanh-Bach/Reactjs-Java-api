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
import com.spring.api.model.Orders;
import com.spring.api.repository.OrdersRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order/")
public class OrdersController {

		@Autowired
		private OrdersRepository ordersRepository;

		@GetMapping("/order")
		public List<Orders> getAllOrders() {
			return ordersRepository.findAll();
		}

		@PostMapping("/order")
		public Orders createOrders(@RequestBody Orders orders) {
			return ordersRepository.save(orders);
		}

		@GetMapping("/order/{id}")
		public ResponseEntity<Orders> getOrdersById(@PathVariable Long id) {
			Orders orders = ordersRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Orders not exist with id :" + id));
			return ResponseEntity.ok(orders);
		}

		@PutMapping("/order/{id}")
		public ResponseEntity<Orders> updateOrders(@PathVariable Long id, @RequestBody Orders ordersDetails) {
			Orders orders = ordersRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Orders not exist with id :" + id));
		
			orders.setTenkh(ordersDetails.getTenkh());
			orders.setDate(ordersDetails.getDate());
			orders.setAddress(ordersDetails.getAddress());
			orders.setPhone(ordersDetails.getPhone());
			orders.setEmail(ordersDetails.getEmail());
			Orders updatedOrders = ordersRepository.save(orders);
			return ResponseEntity.ok(updatedOrders);
		}

		@DeleteMapping("/order/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteOrders(@PathVariable Long id) {
			Orders orders = ordersRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Orders not exist with id :" + id));

			ordersRepository.delete(orders);
			Map<String, Boolean> response = new HashMap<>();
			response.put("deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
		}
		///
		
}
