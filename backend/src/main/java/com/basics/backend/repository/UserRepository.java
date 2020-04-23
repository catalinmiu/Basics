package com.basics.backend.repository;

import com.basics.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository implements JpaRepository<User, Long> {
}
