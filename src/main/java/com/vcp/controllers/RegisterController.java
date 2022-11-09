package com.vcp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
		return 2;
	}
	
	@GetMapping("/listar/{id}")
	public Register obtenerRegister(@PathVariable Long id) {
		return registerService.findById(id);
	}
}
