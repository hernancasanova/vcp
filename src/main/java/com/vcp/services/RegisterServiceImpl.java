package com.vcp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vcp.dao.RegisterDao;
import com.vcp.models.Register;

@Service
public class RegisterServiceImpl implements IRegisterService{

	@Autowired
	private RegisterDao registerDao;
	
	@Override
	@Transactional(readOnly=true)
	public List<Register> findAll() {
		return (List<Register>)registerDao.findAll();
	}

	@Override
	@Transactional(readOnly=true)
	public Register findById(Long id) {
		return registerDao.findById(id).orElse(null);
	}

}
