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
import com.spring.api.model.OrderDetail;
import com.spring.api.model.Products;
import com.spring.api.repository.OrderDetailRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/orderdetail/")
public class OrderDetailsController {
	@Autowired
	private  OrderDetailRepository orderDetailRepository;

	@GetMapping("/orderdetail")
	public List<OrderDetail> getAllOrderDetail() {
		return orderDetailRepository.findAll();
	}
	
	@GetMapping("/orderdetail/{maorder}")
	List<OrderDetail> findByMaorder(@PathVariable String maorder) {
		return orderDetailRepository.findByMaorder(maorder);
	}

	@PostMapping("/orderdetail")
	public OrderDetail createOrderDetail(@RequestBody OrderDetail orderdetail) {
		return orderDetailRepository.save(orderdetail);
	}

//	@GetMapping("/orderdetail/{id}")
//	public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
//		OrderDetail orderdetail = orderDetailRepository.findById(id)
//				.orElseThrow(() -> new ResourceNotFoundException("Ordersdetails not exist with id :" + id));
//		return ResponseEntity.ok(orderdetail);
//	}

	@PutMapping("/orderdetails/{id}")
	public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetail ordersDetails) {
		OrderDetail orderdetail = orderDetailRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("OrderDetail not exist with id :" + id));

		orderdetail.setMaorder(ordersDetails.getMaorder());
		orderdetail.setTen(ordersDetails.getTen());
		orderdetail.setDongia(ordersDetails.getDongia());
		orderdetail.setSoluong(ordersDetails.getSoluong());
		orderdetail.setThanhtien(ordersDetails.getThanhtien());
		OrderDetail updatedOrders = orderDetailRepository.save(orderdetail);
		return ResponseEntity.ok(updatedOrders);
	}

	@DeleteMapping("/orderdetail/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteOrderDetail(@PathVariable Long id) {
		OrderDetail orderdetail = orderDetailRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("OrderDetail not exist with id :" + id));

		orderDetailRepository.delete(orderdetail);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
