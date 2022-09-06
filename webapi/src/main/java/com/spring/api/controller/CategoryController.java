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
import com.spring.api.model.Category;
import com.spring.api.repository.CategoryRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cat/")
public class CategoryController {
	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/category")
	public List<Category> getAllCategory(){
		return categoryRepository.findAll();
	}
	
	
	
	@PostMapping("/category")
	public Category createCategory(@RequestBody Category category) {
	   return categoryRepository.save(category);
	}
	
	@GetMapping("/category/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("category not exist with id :" + id));
		return ResponseEntity.ok(category);
	}
	
	@PutMapping("/category/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails){
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category not exist with id :" + id));
		
		category.setCategoryname(categoryDetails.getCategoryname());
		category.setCategoryimage(categoryDetails.getCategoryimage());
		category.setCategoryslug(categoryDetails.getCategoryslug());
		
		Category updatedcategory = categoryRepository.save(category);
		return ResponseEntity.ok(updatedcategory);
	}

	
	
	@DeleteMapping("/category/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteCategory(@PathVariable Long id){
		Category category = categoryRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category not exist with id :" + id));
		
		categoryRepository.delete(category);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
