package com.basics.backend.dto;

import com.basics.backend.model.Product;
import com.basics.backend.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {

    @NotNull
    private Float score;

    @NotNull
    private String message;

    private Long userId;

    private Long productId;
}
