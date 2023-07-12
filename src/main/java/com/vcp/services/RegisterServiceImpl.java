package com.vcp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
		return (List<Register>)registerDao.findAll(Sort.by(Sort.Direction.ASC, "fecha"));
	}

	@Override
	@Transactional(readOnly=true)
	public Register findById(Long id) {
		return registerDao.findById(id).orElse(null);
	}

	@Override
	public Long register(Register register) {
		Register reg = registerDao.save(register);
		registerDao.flush();
		return reg.getId();
		//Bovine bov = bovineDao.save(bovine);
		//bovineDao.flush();
		//return bov.getId();
		//System.out.println("register");
	}

	@Override
	public List<Register> edit(Long id) {
		// PARTE DONDE SE DEBE EDITAR
		Register registerEdited = this.findById(id);
		return (List<Register>)registerDao.findAll();
	}

}
