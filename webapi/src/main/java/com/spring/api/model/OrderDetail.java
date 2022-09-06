package com.spring.api.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orderdetail")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "ten", nullable = false, length = 255)
	private String ten;
	@Column(name = "dongia", nullable = false, length = 255)
	private long dongia;
	@Column(name = "soluong", nullable = false, length = 255)
	private long soluong;
	@Column(name = "thanhtien", nullable = false, length = 255)
	private long thanhtien;
	@Column(name = "maorder", nullable = false, length = 255)
	private String maorder;
	@Column(name = "image", nullable = false, length = 255)
	private String image;
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
	public long getDongia() {
		return dongia;
	}
	public void setDongia(long dongia) {
		this.dongia = dongia;
	}
	public long getSoluong() {
		return soluong;
	}
	public void setSoluong(long soluong) {
		this.soluong = soluong;
	}
	public long getThanhtien() {
		return thanhtien;
	}
	public void setThanhtien(long thanhtien) {
		this.thanhtien = thanhtien;
	}
	public String getMaorder() {
		return maorder;
	}
	public void setMaorder(String maorder) {
		this.maorder = maorder;
	}
	
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	public OrderDetail(Long id, String ten, long dongia, long soluong, long thanhtien, String maorder, String image) {
		super();
		this.id = id;
		this.ten = ten;
		this.dongia = dongia;
		this.soluong = soluong;
		this.thanhtien = thanhtien;
		this.maorder = maorder;
		this.image = image;
	}
	public OrderDetail() {
		super();
	}
	
	
}
