package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity(name = "Reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    public Review(Float score, String message, User user, Product product) {
        this.score = score;
        this.message = message;
        this.user = user;
        this.product = product;
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Float score;

    @NotNull
    private String message;

    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    private Product product;


}
