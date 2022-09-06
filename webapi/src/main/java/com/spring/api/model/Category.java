package com.spring.api.model;



import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;


@Entity
@Table(name = "Category")

public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "categoryname", nullable = false, length=255)
	private String categoryname;
	
	@Column(name = "categoryimage", nullable = false, length=255)
	private String categoryimage;
	
	@Column(name = "categoryslug", nullable = false, length=255)
	private String categoryslug;

	public Category() {
		super();
	}
	
	
	
	public Category(String categoryname) {
		super();
		this.categoryname = categoryname;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public String getCategoryimage() {
		return categoryimage;
	}
	public void setCategoryimage(String categoryimage) {
		this.categoryimage = categoryimage;
	}
	public String getCategoryslug() {
		return categoryslug;
	}
	public void setCategoryslug(String categoryslug) {
		this.categoryslug = categoryslug;
	}

	

	
	
}
