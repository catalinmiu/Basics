package com.basics.backend.repository;

import com.basics.backend.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardProductRepository extends JpaRepository<CartProduct, Long> {
}
