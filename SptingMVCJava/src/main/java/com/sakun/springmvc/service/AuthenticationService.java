package com.sakun.springmvc.service;

import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
	
	public boolean isUserAuthenticated(String email,String password) {
		if(email.equals("sakun@gmail.com")  && password.equals("123")) {
			return true;	
		} else {
			return false;
		}
		
	}
}
