package com.spring.api.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {

	  Boolean existsByCategoryname(String categoryname);
}
