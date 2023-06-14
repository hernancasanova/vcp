package com.vcp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.vcp.models.Register;

public interface RegisterDao extends JpaRepository<Register,Long>{

}
