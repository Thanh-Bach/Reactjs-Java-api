package com.spring.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "ten", nullable = false, length = 255)
	private String ten;
	@Column(name = "gia", nullable = false, length = 255)
	private Long dongia;
	@Column(name = "soluong", nullable = false, length = 255)
	private Long soluong;
	public Cart(String ten, Long dongia, Long soluong) {
		super();
		this.ten = ten;
		this.dongia = dongia;
		this.soluong = soluong;
	}
	public Cart() {
		super();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTen() {
		return ten;
	}
	public void setTen(String ten) {
		this.ten = ten;
	}
	public Long getDongia() {
		return dongia;
	}
	public void setDongia(Long dongia) {
		this.dongia = dongia;
	}
	public Long getSoluong() {
		return soluong;
	}
	public void setSoluong(Long soluong) {
		this.soluong = soluong;
	}
	
}
