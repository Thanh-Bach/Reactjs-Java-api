package com.spring.api.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.api.model.OrderDetail;
import com.spring.api.model.Products;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
	List<OrderDetail> findByMaorder(String maorder);
}
