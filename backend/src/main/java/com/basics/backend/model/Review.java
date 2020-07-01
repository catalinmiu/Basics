package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;

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
//    @JsonIgnore
    private User user;

    @ManyToOne
    @JsonIgnore
    private Product product;

    @Past
    private LocalDateTime dateTime;

}
