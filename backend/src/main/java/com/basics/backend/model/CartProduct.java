package com.basics.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity(name = "cart_product")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartProduct {
    @EmbeddedId
    private CartProductId cartProductId;

    @ManyToOne
    @MapsId("cartId")
    private Cart cart;

    @ManyToOne
    @MapsId("productId")
    private Product product;

    private Double quantity;
}
