package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity(name = "Products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    public Product(String title, String description, Double price, Long stock, Category category, List<Review> reviews, Float score) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.reviews = reviews;
        this.score = score;
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

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("product")
    private List<Review> reviews;

    @NotNull
    private Float score;

    @Column(columnDefinition = "TEXT")
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "cart")
    private List<CartProduct> cartProducts;
}
