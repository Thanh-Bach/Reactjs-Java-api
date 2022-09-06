package com.spring.api.model;



import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;


@Entity
@Table(name = "Brand")

public class Brand {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "brandname", nullable = false, length=255)
	private String brandname;
	@Column(name = "brandimage", nullable = false, length=255)
	private String brandimage;

	public Brand() {
		super();
	}
	
	
	
	public Brand(String brandname) {
		super();
		this.brandname = brandname;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getBrandname() {
		return brandname;
	}
	public void setBrandname(String brandname) {
		this.brandname = brandname;
	}
	public String getBrandimage() {
		return brandimage;
	}
	public void setBrandimage(String brandimage) {
		this.brandimage = brandimage;
	}
}
