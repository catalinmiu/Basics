package com.basics.backend.service;

import com.basics.backend.model.Review;
import com.basics.backend.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public void delete(Long id) {
        reviewRepository.deleteById(id);
    }
}
