package com.basics.backend.controller;


import com.basics.backend.exception.CategoryNotFoundException;
import com.basics.backend.model.Category;
import com.basics.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAllCategories() {
        List<Category> categoryList = categoryService.findAll();
        return ResponseEntity.ok(categoryList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> findCategoryById(@PathVariable Long id) {
        Optional<Category> foundCategory = categoryService.findById(id);
        if (! foundCategory.isPresent()) {
            throw new CategoryNotFoundException("Category with id :" + id + " was not found!");
        }

        return ResponseEntity.ok(foundCategory);
    }

    @PostMapping
    public ResponseEntity<Object> addCategory(@Valid @RequestBody Category category) {
        Category savedCategory = categoryService.save(category);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedCategory.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Category>> deleteCategory(@PathVariable Long id) {
        Optional<Category> foundCategory = categoryService.findById(id);
        if (! foundCategory.isPresent()) {
            throw new CategoryNotFoundException("Category with id : " + id + " was not found!");
        }

        categoryService.deleteById(id);
        return ResponseEntity.ok(foundCategory);
    }
}
