package com.vcp.services;

import java.util.List;

import com.vcp.models.Register;

public interface IRegisterService {
	public List<Register> findAll();
	public Register findById(Long id);
	public void register(Register register);
	public List<Register> edit(Long id);
}
