package com.basics.backend.service;

import com.basics.backend.dto.ProductDto;
import com.basics.backend.model.Cart;
import com.basics.backend.model.CartProduct;
import com.basics.backend.model.Product;
import com.basics.backend.model.User;
import com.basics.backend.repository.CardProductRepository;
import com.basics.backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private CartRepository cartRepository;
    private CardProductRepository cardProductRepository;
    private UserService userService;
    private ProductService productService;

    public CartService(CartRepository cartRepository, UserService userService, CardProductRepository cardProductRepository, ProductService productService) {
        this.cartRepository = cartRepository;
        this.userService = userService;
        this.productService = productService;
        this.cardProductRepository = cardProductRepository;
    }

    public List<Cart> getAllCartsByUserId(Long id) {
        Optional<User> user = userService.findById(id);
        if(user.isPresent()) {
            return cartRepository.findAllByUserAndPaidDate(user.get(), null);
        } else {
            return null;
        }
    }

    public Cart getCurrentCart(Long userId) {
        Optional<User> user = userService.findById(userId);
        if(user.isPresent()) {
            return cartRepository.findByUserAndPaidDate(user.get(), null);
        } else {
            return null;
        }
    }

    public void save(Long userId, ProductDto productDto) {
        Cart cart = getCurrentCart(userId);
        List<CartProduct> cartProducts = cardProductRepository.findCartProductByCart(cart);
        for (CartProduct cartProduct : cartProducts) {
            if (productDto.getProductId().equals(cartProduct.getProduct().getId())) {
                cartProduct.setQuantity(cartProduct.getQuantity() + 1);
                cardProductRepository.save(cartProduct);
                return;
            }
        }
        CartProduct newCartProduct = new CartProduct();
        newCartProduct.setCart(cart);
        newCartProduct.setQuantity(productDto.getQuantity());
        newCartProduct.setProduct(productService.findById(productDto.getProductId()).get());
        cardProductRepository.save(newCartProduct);

    }
}
