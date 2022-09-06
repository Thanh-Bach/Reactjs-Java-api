package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long>{

}
