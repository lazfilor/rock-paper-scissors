package com.filor.rps.handlers;

import com.filor.rps.model.Move;
import com.filor.rps.services.ReviewProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

/**
 * Handler represents entrypoint for web-clients regarding reviews for certain plays that occurred
 */
@Slf4j
@RequestMapping("/review")
@RestController
public class ReviewHandler {

    private final ReviewProvider reviewProvider;

    @Autowired
    public ReviewHandler(ReviewProvider reviewProvider) {
        this.reviewProvider = reviewProvider;
    }

    @GetMapping
    public Mono<ResponseEntity<Response>> getReview(@RequestParam Move userMove, @RequestParam Move serverMove) {
        return reviewProvider.getReview(userMove,serverMove)
                .flatMap(reviewText -> Mono.just(ResponseEntity.ok(new Response(reviewText))))
                .onErrorReturn(ResponseEntity.internalServerError().body(new Response("")));
    }

    public record Response (String text) {}
}
