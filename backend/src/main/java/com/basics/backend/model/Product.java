package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "Products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    public Product(String title, String description, Double price, Long stock, Category category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                '}';
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String title;

    @Size(max = 500)
    @NotNull
    private String description;

    @NotNull
    private Double price;

    @NotNull
    private Long stock;

    @ManyToOne
    @NotNull
    @JsonIgnoreProperties("products")
    private Category category;
}
