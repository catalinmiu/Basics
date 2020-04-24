package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity(name = "Categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    public Category(String title) {
        this.title = title;
    }

    public Category(String title, List<Product> products) {
        this.title = title;
        this.products = products;
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String title;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("category")
    private List<Product> products;
}
