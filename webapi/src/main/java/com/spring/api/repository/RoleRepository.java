package com.spring.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.ERole;
import com.spring.api.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long>  {
	Optional<Role> findByName(ERole name);
}