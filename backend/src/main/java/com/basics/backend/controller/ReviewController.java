package com.basics.backend.controller;

import com.basics.backend.exception.ReviewNotFoundException;
import com.basics.backend.model.Review;
import com.basics.backend.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
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
    public ResponseEntity<Object> addReview(Review review) {
        Review savedReview = reviewService.save(review);
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
