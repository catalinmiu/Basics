package com.basics.backend.controller;

import com.basics.backend.dto.CartProductDto;
import com.basics.backend.dto.ProductDto;
import com.basics.backend.model.Cart;
import com.basics.backend.model.CartProduct;
import com.basics.backend.model.User;
import com.basics.backend.model.UserDetailsImpl;
import com.basics.backend.service.CartService;
import com.basics.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carts")
public class CartController {

    private CartService cartService;

    private UserService userService;

    public CartController(CartService cartService, UserService userService) {
        this.cartService = cartService;
        this.userService = userService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getAllCartsByUserId(@PathVariable Long userId) {
        List<Cart> cartList = cartService.getAllCartsByUserId(userId);
        return ResponseEntity.ok(cartList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCurrentCart(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.getCurrentCart(id));
    }

    @PostMapping
    public ResponseEntity<String> addCartProduct(Principal principal, @RequestBody ProductDto productDto) {
        Long id = ((UserDetailsImpl)((UsernamePasswordAuthenticationToken) principal).getPrincipal()).getUser().getId();
        cartService.save(id, productDto);
        return ResponseEntity.ok("oke");
    }


}
