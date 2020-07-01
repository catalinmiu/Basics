package com.basics.backend.controller;

import com.basics.backend.dto.ReviewDto;
import com.basics.backend.exception.ReviewNotFoundException;
import com.basics.backend.model.Product;
import com.basics.backend.model.Review;
import com.basics.backend.model.User;
import com.basics.backend.service.ProductService;
import com.basics.backend.service.ReviewService;
import com.basics.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")

public class ReviewController {

    private ReviewService reviewService;
    private ProductService productService;
    private UserService userService;


    public ReviewController(ReviewService reviewService, ProductService productService, UserService userService) {
        this.reviewService = reviewService;
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Review>> findAllReviews() {
        List<Review> allReviews = reviewService.findAllReviews();
        return ResponseEntity.ok(allReviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Review>> findReviewById(@PathVariable Long id) {
        Optional<Review> foundReview = reviewService.findReviewById(id);
        if (!foundReview.isPresent()) {
            throw new ReviewNotFoundException("Review with id :" + id + " was not found !");
        }

        return ResponseEntity.ok(foundReview);
    }

    @PostMapping
    public ResponseEntity<Object> addReview(@Valid @RequestBody ReviewDto review) {
        Review newReview = new Review();
        Optional<User> user = userService.findById(review.getUserId());
        Optional<Product> product = productService.findById(review.getProductId());
        newReview.setMessage(review.getMessage());
        newReview.setProduct(product.get());
        newReview.setUser(user.get());
        newReview.setScore(review.getScore());
        newReview.setDateTime(LocalDateTime.now());
        Float score;
        if (product.get().getReviews().size() == 0) {
            score = review.getScore();
        } else {
            score = ((product.get().getReviews().size() * product.get().getScore()) + review.getScore() ) /  (product.get().getReviews().size() + 1);
        }
        Product product1 = product.get();
        product1.setScore(score);
        productService.save(product1);
        Review savedReview = reviewService.save(newReview);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("{id}")
                .buildAndExpand(savedReview.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Review>> deleteReviewById(@PathVariable Long id) {
        Optional<Review> foundReview = reviewService.findReviewById(id);
        if (!foundReview.isPresent()) {
            throw  new ReviewNotFoundException("Review with id : " + id + " was not found !");
        }

        return ResponseEntity.ok(foundReview);
    }
}
