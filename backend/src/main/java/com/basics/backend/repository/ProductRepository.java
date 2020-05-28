package com.basics.backend.repository;

import com.basics.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    public List<Product> findByTitleContaining(String title);
    public List<Product> findByStockEquals(Long stock);
}
