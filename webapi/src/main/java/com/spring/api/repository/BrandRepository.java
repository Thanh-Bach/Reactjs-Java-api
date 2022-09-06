package com.spring.api.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {

	  Boolean existsByBrandname(String brandname);
}
