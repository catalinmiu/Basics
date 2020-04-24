package com.basics.backend.controller;

import com.basics.backend.exception.ProductNotFoundException;
import com.basics.backend.model.Product;
import com.basics.backend.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> findAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Product> findProductById(@PathVariable Long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (! foundProduct.isPresent()) {
            throw new ProductNotFoundException("Product with id : " + id + " was not found!");
        }

        return foundProduct;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Product addProduct(@Valid @RequestBody Product product) {
        return productService.save(product);
    }

    @DeleteMapping("/{id}")
    public Optional<Product> deleteProductById(@PathVariable Long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (! foundProduct.isPresent()) {
            throw new ProductNotFoundException("Product with id : " + id + " was not found!");
        }
        productService.deleteById(id);

        return foundProduct;
    }

    @GetMapping("/search/{title}")
    public List<Product> findByTitleContaining(@PathVariable String title) {
        return productService.findByTitleContaining(title);
    }
}
