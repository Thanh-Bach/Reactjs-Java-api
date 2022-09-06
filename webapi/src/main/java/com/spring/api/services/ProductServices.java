package com.spring.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.api.model.Category;
import com.spring.api.model.Products;
import com.spring.api.repository.CategoryRepository;
import com.spring.api.repository.ProductsRepository;



@Service
public class ProductServices {

	@Autowired
	ProductsRepository productRepo;
	@Autowired
	CategoryRepository cateRepo;
	
	public List<Products>getAllProducts(){
		return productRepo.findAll();
	}
	
	
	public List<Category>getAllCategory(){
		return cateRepo.findAll();
	}
	
	public Products getProductsById(long productId) throws Exception {
		return productRepo.findById(productId).orElseThrow(() ->new Exception("Product is not found"));
	}
}
