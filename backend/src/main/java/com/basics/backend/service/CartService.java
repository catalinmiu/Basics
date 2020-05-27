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

    public Cart getCurrentUserCart(Long userId) {
        Optional<User> user = userService.findById(userId);
        if(user.isPresent()) {
            return cartRepository.findByUserAndPaidDate(user.get(), null);
        } else {
            return null;
        }
    }

    public Cart save(Long userId, List<ProductDto> productDtoList) {
        List<ProductDto> productDtoList1 = productDtoList;
        Cart cart = getCurrentUserCart(userId);
        List<CartProduct> cartProducts = cart.getCartProducts();
        for (CartProduct cartProduct : cartProducts) {
            for (ProductDto productDto : productDtoList) {
                if (cartProduct.getProduct().getId().equals(productDto.getProductId())) {
                    cartProduct.setQuantity(cartProduct.getQuantity() + productDto.getQuantity());
                    productDtoList1.remove(productDto);
                    break;
                }
            }
        }

        for (ProductDto productDto : productDtoList1) {
            CartProduct cartProduct = new CartProduct();
            cartProduct.setQuantity(productDto.getQuantity());
            cartProduct.setCart(cart);
            Optional<Product> product = productService.findById(productDto.getProductId());
            cartProduct.setProduct(product.get());
            cardProductRepository.save(cartProduct);
            cartProducts.add(cartProduct);
        }

        return cart;

    }
}
