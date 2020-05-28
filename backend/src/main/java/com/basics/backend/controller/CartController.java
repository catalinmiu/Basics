package com.basics.backend.controller;

import com.basics.backend.dto.CartProductDto;
import com.basics.backend.dto.ProductDto;
import com.basics.backend.model.Cart;
import com.basics.backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getAllCartsByUserId(@PathVariable Long userId) {
        List<Cart> cartList = cartService.getAllCartsByUserId(userId);
        return ResponseEntity.ok(cartList);
    }

//    @PutMapping("/user/{userId}")
//    public ResponseEntity<Object> addCart(@PathVariable Long userId, @RequestBody CartProductDto cartProductDto) {
//        Cart cart = cartService.save(userId, productDtoList);
//        return ResponseEntity.ok(cart);
//    }

}
