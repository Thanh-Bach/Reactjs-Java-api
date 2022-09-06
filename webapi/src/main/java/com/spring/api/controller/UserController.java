package com.spring.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.exception.ResourceNotFoundException;
import com.spring.api.model.User;
import com.spring.api.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	 @Autowired
	PasswordEncoder encoder;
	// get all user
	@GetMapping("/users")
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}		
	
	// create user rest api
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
	user.setPassword(encoder.encode(user.getPassword()));
	   return userRepository.save(user);
	}


	// get user by id rest api
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		return ResponseEntity.ok(user);
	}
	
// update user rest api
	
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		
		user.setUsername(userDetails.getUsername());
		user.setPassword(encoder.encode(userDetails.getPassword()));
		user.setEmail(userDetails.getEmail());
		
		User updateduser = userRepository.save(user);
		return ResponseEntity.ok(updateduser);
	}
	// delete user rest api
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		
		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
