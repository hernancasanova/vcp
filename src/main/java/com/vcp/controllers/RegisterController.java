package com.vcp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vcp.models.Register;
import com.vcp.services.IRegisterService;

@RestController
public class RegisterController {
	@Autowired
	private IRegisterService registerService;
	
	@GetMapping("/listar")
	public List<Register> listar(){
		return registerService.findAll();
	}
	
	@GetMapping("/test")
	public int test(){
		return 33333;
	}
	
	@GetMapping("/edit/{id}")
	public int edit(@PathVariable Long id) {
		int statusCode;
		try {
			statusCode=200;
			registerService.edit(id);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo editar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
	
	@PostMapping("/register")
	//public String register() {
	public int register(@RequestBody Register register) {
		int statusCode;
		try {
			statusCode=200;
			registerService.register(register);
			return statusCode;
		}catch(Exception e){
			System.out.println("No se pudo guardar: "+e);
			statusCode=500;
			return statusCode;
		}
	}
	
	@GetMapping("/listar/{id}")
	public Register obtenerRegister(@PathVariable Long id) {
		return registerService.findById(id);
	}
}
