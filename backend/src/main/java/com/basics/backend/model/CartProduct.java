package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "cart_product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartProduct {
    @Id
    @GeneratedValue
    private Long cartProductId;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    //@JsonIgnore
    private Product product;

    private Long quantity;
}
