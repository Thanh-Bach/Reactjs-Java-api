package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Cart;


public interface CartRepository extends JpaRepository<Cart, Long>{

}
