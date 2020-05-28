package com.basics.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "CARTS")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Cart {

    @Id
    @GeneratedValue
    private Long cartId;

    @JsonIgnore
    @ManyToOne
    private User user;

    @Past
    private LocalDateTime paidDate;

    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<CartProduct> cartProducts;
}
