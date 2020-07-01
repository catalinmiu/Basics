package com.basics.backend.repository;

import com.basics.backend.model.Cart;
import com.basics.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findAllByUserAndPaidDate(User user, LocalDateTime paidDate);
    Cart findByUserAndPaidDate(User user, LocalDateTime paidDate);
    public List<Cart> findByPaidDateNotNull();
}
