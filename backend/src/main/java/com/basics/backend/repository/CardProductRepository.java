package com.basics.backend.repository;

import com.basics.backend.model.Cart;
import com.basics.backend.model.CartProduct;
import com.basics.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardProductRepository extends JpaRepository<CartProduct, Long> {
    public List<CartProduct> findCartProductByCart(Cart cart);
//    public void deleteByCartAndAndCartProductId(Cart cart, Long id);
}
