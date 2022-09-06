package com.spring.api.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.api.model.Products;

public interface ProductsRepository extends JpaRepository<Products, Long>  {
	List<Products> findByCategoryslug(String categoryslug);
	Optional<Products> findById(Long Id);
	@Query("SELECT s FROM Products s WHERE productname LIKE %?1%")
	List<Products> findByName(String productname);
}
