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
import com.spring.api.model.Brand;
import com.spring.api.repository.BrandRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/brd/")
public class BrandController {
	@Autowired
	private BrandRepository brandRepository;
	
	@GetMapping("/brand")
	public List<Brand> getAllbrand(){
		return brandRepository.findAll();
	}
	
	
	
	@PostMapping("/brand")
	public Brand createbrand(@RequestBody Brand brand) {
	   return brandRepository.save(brand);
	}
	
	@GetMapping("/brand/{id}")
	public ResponseEntity<Brand> getbrandById(@PathVariable Long id) {
		Brand brand = brandRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("brand not exist with id :" + id));
		return ResponseEntity.ok(brand);
	}
	
	@PutMapping("/brand/{id}")
	public ResponseEntity<Brand> updatebrand(@PathVariable Long id, @RequestBody Brand brandDetails){
		Brand brand = brandRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("brand not exist with id :" + id));
		
		brand.setBrandname(brandDetails.getBrandname());
		brand.setBrandimage(brandDetails.getBrandimage());
		
		Brand updatedbrand = brandRepository.save(brand);
		return ResponseEntity.ok(updatedbrand);
	}

	
	
	@DeleteMapping("/brand/{id}")
	public ResponseEntity<Map<String, Boolean>> deletebrand(@PathVariable Long id){
		Brand brand = brandRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("brand not exist with id :" + id));
		
		brandRepository.delete(brand);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
