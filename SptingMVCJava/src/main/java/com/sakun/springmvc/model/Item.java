package com.sakun.springmvc.model;

import java.math.BigDecimal;
import java.util.Date;

public class Item {
	private int id;
	private String brand;
	private String type;
	private  BigDecimal price;
	private String description;
	private Date expireDate;
	
	public Item() {}

	public Item(int id, String brand, String type, BigDecimal price, String description, Date expireDate) {
		super();
		this.id = id;
		this.brand = brand;
		this.type = type;
		this.price = price;
		this.description = description;
		this.expireDate = expireDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getExpireDate() {
		return expireDate;
	}

	public void setExpireDate(Date expireDate) {
		this.expireDate = expireDate;
	}

	@Override
	public String toString() {
		return "Item [id=" + id + ", brand=" + brand + ", type=" + type + ", price=" + price + ", description="
				+ description + ", expireDate=" + expireDate + "]";
	}
	
	
}
