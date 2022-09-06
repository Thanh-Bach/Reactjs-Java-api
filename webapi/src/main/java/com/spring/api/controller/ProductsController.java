package com.spring.api.controller;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.spring.api.exception.ResourceNotFoundException;
import com.spring.api.model.Brand;
import com.spring.api.model.Category;
import com.spring.api.model.Products;
import com.spring.api.repository.CategoryRepository;
import com.spring.api.repository.ProductsRepository;


@CrossOrigin(origins = "*", maxAge = 3600)
	@RestController
	@RequestMapping("/api/prd/")
public class ProductsController {
	@Autowired
	private ProductsRepository productsRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/products")
	public List<Products> getAllProducts(){
		return productsRepository.findAll();
	}
	@GetMapping("/search")
	public List<Products> findAll(@RequestParam Optional<String> productname) {
		return productsRepository.findByName(productname.orElse(null));
	}
//	@GetMapping("/products/{categoryId}")
//	  public ResponseEntity<List<Products>> getAllProductsByCategoryId(@PathVariable(value = "categoryId") Long categoryId) {
//	    if (!categoryRepository.existsById(categoryId)) {
//	      throw new ResourceNotFoundException("Not found Tutorial with id = " + categoryId);
//	    }
//
//	    List<Products> products = productsRepository.findByCategoryId(categoryId);
//	    return new ResponseEntity<>(products, HttpStatus.OK);
//	  }
	@GetMapping("/products/{categoryslug}")
	List<Products> findByCategoryslug(@PathVariable String categoryslug) {
		return productsRepository.findByCategoryslug(categoryslug);
	}
	
	@GetMapping("/productdetail/{productId}")
	Optional<Products> findById(@PathVariable Long productId) {
		return productsRepository.findById(productId);
	}
	
//	@PostMapping("/products/{categoryId}")
//	  public ResponseEntity<Products> createProduct(@PathVariable(value = "categoryId") Long categoryId,
//	      @RequestBody Products productRequest) {
//		Products products = categoryRepository.findById(categoryId).map(category -> {
//			productRequest.setCategory(category);
//	      return productsRepository.save(productRequest);
//	    }).orElseThrow(() -> new ResourceNotFoundException("Not found Tutorial with id = " + categoryId));
//
//	    return new ResponseEntity<>(products, HttpStatus.CREATED);
//	  }
	
//	@PostMapping("/products")
//    public ResponseEntity<Products> create(@RequestBody @Valid Products product) {
//        Optional<Category> optionalCategory = categoryRepository.findById(product.getCategory().getId());
//        if (!optionalCategory.isPresent()) {
//            return ResponseEntity.unprocessableEntity().build();
//        }
//
//        product.setCategory(optionalCategory.get());
//
//        Products savedProduct = productsRepository.save(product);
//        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
//            .buildAndExpand(savedProduct.getId()).toUri();
//
//        return ResponseEntity.created(location).body(savedProduct);
//    }
	
	@PostMapping("/products")
	public Products createProducts(@RequestBody Products products) {
	   return productsRepository.save(products);
	}
	
	
	@PutMapping("/products/{id}")
	public ResponseEntity<Products> updateProducts(@PathVariable Long id, @RequestBody Products productsDetails){
		Products products = productsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Products not exist with id :" + id));
		
		products.setProductname(productsDetails.getProductname());
		products.setDiscount(productsDetails.getDiscount());
		products.setDescription(productsDetails.getDescription());
		products.setCategory(productsDetails.getCategory());
		products.setCategoryslug(productsDetails.getCategoryslug());
		products.setBrand(productsDetails.getBrand());
		products.setAvatar(productsDetails.getAvatar());
		products.setPrice(productsDetails.getPrice());
		products.setTrash(productsDetails.getTrash());
		products.setStatus(productsDetails.getStatus());

		
		Products updatedproducts = productsRepository.save(products);
		return ResponseEntity.ok(updatedproducts);
	}

	
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProducts(@PathVariable Long id){
		Products products = productsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Products not exist with id :" + id));
		
		productsRepository.delete(products);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
	
}
