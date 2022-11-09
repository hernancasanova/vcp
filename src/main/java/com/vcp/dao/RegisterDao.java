package com.vcp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcp.models.Register;

public interface RegisterDao extends JpaRepository<Register,Long>{

}
