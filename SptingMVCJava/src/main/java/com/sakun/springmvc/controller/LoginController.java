package com.sakun.springmvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sakun.springmvc.model.User;
import com.sakun.springmvc.service.AuthenticationService;


@CrossOrigin(origins="http://localhost:4200")
@RestController
public class LoginController {
	
	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping(value="/login")
	public boolean login(@RequestBody User user) {
		String email = user.getEmail();
		String password = user.getPassword();
		boolean flag = authenticationService.isUserAuthenticated(email, password);
		if(flag) {
			return true;
		}
		return false;
	}
	
}
