package com.sakun.springmvc.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sakun.springmvc.model.Item;

@Service
public class ItemService {

	Date date = new Date();
	BigDecimal price = new BigDecimal("100");
	Item item1 = new Item(1,"LG","TV",price,"item description", date);
	Item item2 = new Item(2,"Samsung","TV",price,"This is a samsung tv", date);
	Item item3 = new Item(3,"Samsung","Fridge",price,"asd", date);
	Item item4 = new Item(4,"Abans","Laptop",price,"This is an abans laptop", date);
	
	List<Item> list = new ArrayList<Item>();
	
	public ItemService() {
		saveHardCoded();
	}
	
	public void saveHardCoded() {
		list.add(item1);
		list.add(item2);
		list.add(item3);
		list.add(item4);
		
		for (Item x:list) {
			System.out.println(x);
		}
		
	}
	
	public boolean saveItem(Item item) {
		list.add(item);
		return true;
	}
	
	public List<Item> getAll() {
		return list;
	}

	public List<Item> getSearchedItems(String brand, String type, String desc) {
		List<Item> searchList = new ArrayList<Item>();
		for (Item x:list) {
			if (x.getBrand().equals(brand) && x.getType().equals(type) && x.getDescription().contains(desc)) {
				searchList.add(x);
			}
		}
		return searchList;
	}

	public boolean deleteItem(int id) {
		for(Item x:list) {
			if(x.getId() == id) {
				list.remove(x);
				return true;
			}
		}
		return false;
	}
}
