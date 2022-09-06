package com.spring.api.model;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "orders")
	
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "tenkh", nullable = false, length = 255)
	private String tenkh;
	@Column(name = "address", nullable = false, length = 255)
	private String address;
	@Column(name = "phone", nullable = false, length = 255)
	private String phone;
	@Column(name = "email", nullable = false, length = 255)
	private String email;
	@CreationTimestamp
	@Column(name = "date")
	private LocalDate Date;
	
	public Orders() {
		super();
	}

	public Orders(Long id, String tenkh, String address, String phone, String email,
			LocalDate date) {
		super();
		this.id = id;
		this.tenkh = tenkh;
		this.address = address;
		this.phone = phone;
		this.email = email;
		
		Date = date;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public String getTenkh() {
		return tenkh;
	}

	public void setTenkh(String tenkh) {
		this.tenkh = tenkh;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDate() {
		return Date;
	}

	public void setDate(LocalDate date) {
		Date = date;
	}
	
	
	
}
