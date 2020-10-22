package com.sakun.springmvc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sakun.springmvc.model.Item;
import com.sakun.springmvc.service.ItemService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ItemController {
	
	@Autowired
	private ItemService itemService; 

	@PostMapping("/item")
	public Item saveItem(@RequestBody Item item) {
		itemService.saveItem(item);
		return item;
	}
	
	@GetMapping("/item")
	public List<Item> getItem() {
		return itemService.getAll();
	}
	
	@GetMapping("/item/{brand}/{type}/{desc}")
	public List<Item> getSearchItems(@PathVariable("brand") String brand,@PathVariable("type") String type,@PathVariable("desc") String desc) {
		return itemService.getSearchedItems(brand,type,desc);
	}
	
	@DeleteMapping("item/{id}")
	public void deleteItem(@PathVariable int id) {
		itemService.deleteItem(id);
	}
}
