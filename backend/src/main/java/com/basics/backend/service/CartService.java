package com.basics.backend.service;

import com.basics.backend.dto.ProductDto;
import com.basics.backend.model.Cart;
import com.basics.backend.model.CartProduct;
import com.basics.backend.model.Product;
import com.basics.backend.model.User;
import com.basics.backend.repository.CardProductRepository;
import com.basics.backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        if (user.isPresent()) {
            return cartRepository.findAllByUserAndPaidDate(user.get(), null);
        } else {
            return null;
        }
    }

    public Cart getCurrentCart(Long userId) {
        Optional<User> user = userService.findById(userId);
        if (user.isPresent()) {
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
                cartProduct.setQuantity(productDto.getQuantity());
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

    public List<CartProduct> getProductsFromCartByUserId(Long userId) {
        Cart cart = getCurrentCart(userId);
        List<CartProduct> products = cardProductRepository.findCartProductByCart(cart);
        return products;
    }

    public void checkoutCart(Long userId) {
        Cart cart = getCurrentCart(userId);
        cart.setPaidDate(LocalDateTime.now());
        List<CartProduct> cartProducts = cardProductRepository.findCartProductByCart(cart);
        for(CartProduct cartProduct : cartProducts) {
            Product product = productService.findById(cartProduct.getProduct().getId()).get();
            product.setStock(product.getStock() - cartProduct.getQuantity());
            productService.save(product);
        }
        cartRepository.save(cart);
    }

    public void addNewCart(Long userId) {
        Cart cart = new Cart();
        cart.setUser(userService.findById(userId).get());
        cart.setPaidDate(null);
        cartRepository.save(cart);
    }

    public List<Cart> getAllPaidCarts() {
        return cartRepository.findByPaidDateNotNull();
    }

    public Double totalSales() {
        List<Cart> paidCarts = cartRepository.findByPaidDateNotNull();
        Double totalSales = 0D;
        for(Cart cart: paidCarts) {
            List<CartProduct> cartProducts = cardProductRepository.findCartProductByCart(cart);
            for (CartProduct cartProduct : cartProducts) {
                totalSales += cartProduct.getProduct().getPrice()*cartProduct.getQuantity();
            }
        }
        return totalSales;
    }

//    public void deleteByCartAndCartProductId(Long userId) {
//        Cart cart = getCurrentCart(userId);
//        cardProductRepository.deleteByCartAndAndCartProductId(cart, id);
//    }
}
