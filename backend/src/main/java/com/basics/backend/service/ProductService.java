package com.basics.backend.service;

import com.basics.backend.model.Product;
import com.basics.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> findByTitleContaining(String title) {
        return productRepository.findByTitleContaining(title);
    }

    public List<Product> findByStockEquals(Long stock) {
        return productRepository.findByStockEquals(0L);
    }

//    @Transactional
//    public void saveImageFile(Long recipeId, byte[] file) {
//
//            Product recipe = productRepository.findById(recipeId).get();
//
//
//
//            recipe.setImage(file);
//
//            productRepository.save(recipe);
//
//    }
}
