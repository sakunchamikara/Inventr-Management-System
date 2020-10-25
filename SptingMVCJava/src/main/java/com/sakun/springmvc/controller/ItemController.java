package com.sakun.springmvc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sakun.springmvc.model.Item;
import com.sakun.springmvc.service.ItemService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ItemController {
	
	@Autowired
	private ItemService itemService;

	@GetMapping("/item")
	public List<Item> getItem() {
		return itemService.getAll();
	}

	@PostMapping("/item")
	public Item saveItem(@RequestBody Item item) {
		itemService.saveItem(item);
		return item;
	}
	
	@DeleteMapping("item/{id}")
	public void deleteItem(@PathVariable int id) {
		itemService.deleteItem(id);
	}


	@GetMapping("/searchItem")
	public List<Item> getSearchItem(@RequestParam Map<String, String> param) {
		String brand = param.get("brand");
		String type = param.get("type");
		String desc = param.get("description");
		return itemService.getSearchedItems(brand,type,desc);
	}

}
