package com.spring.api.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "products")

public class Products {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "productname", nullable = false, length=255)
	private String productname;

//	@ManyToOne
//	  @JoinColumn(name = "category_id", nullable = false)
//	  @OnDelete(action = OnDeleteAction.CASCADE)
//	(cascade =  CascadeType.PERSIST)
	@Column(name = "category",nullable = false, length=255)
	private String category;
	
	@Column(name = "categoryslug",nullable = false, length=255)
	private String categoryslug;
	
	@Column(name = "brand",nullable = false, length=255)
	private String brand;

	@Column(name = "avatar",nullable = false, length=255)
	private String avatar;
	
	@Column(name = "discount",nullable = false)
	private Long discount;
	
	@Column(name = "price",nullable = false)
	private Long price;
	
	@Column(name = "description",nullable = false)
	private String description;
	
	@Column(name = "trash",nullable = true)
	private Integer trash;

	@Column(name = "status",nullable = true)
	private Integer status;

	
	public Products() {
		
	}

	
	public Products(String productname, String category, String categoryslug, String brand, String avatar,
			Long discount, Long price, String description, Integer trash, Integer status) {
		super();
		this.productname = productname;
		this.category = category;
		this.categoryslug = categoryslug;
		this.brand = brand;
		this.avatar = avatar;
		this.discount = discount;
		this.price = price;
		this.description = description;
		this.trash = trash;
		this.status = status;
	}

	public String getCategoryslug() {
		return categoryslug;
	}


	public void setCategoryslug(String categoryslug) {
		this.categoryslug = categoryslug;
	}


	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getProductname() {
		return productname;
	}


	public void setProductname(String productname) {
		this.productname = productname;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}

	public String getAvatar() {
		return avatar;
	}


	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}


	public Long getPrice() {
		return price;
	}


	public void setPrice(Long price) {
		this.price = price;
	}


	public Long getDiscount() {
		return discount;
	}

	public void setDiscount(Long discount) {
		this.discount = discount;
	}

	public Integer getTrash() {
		return trash;
	}


	public void setTrash(Integer trash) {
		this.trash = trash;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
	}

	
	
	
}
