package com.filor.rps.handlers;

import com.filor.rps.model.Move;
import com.filor.rps.services.ReviewProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Get a review text for a recent play that captures a fitting reaction to the play's outcome when the result was either a win or loss")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Server was able to find a matching review", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Response.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid configuration of the move query-parameters, such as providing moves that result in a tie"),
            @ApiResponse(responseCode = "500", description = "Unable to find a fitting review due to internal reasons such as unavailable third-parties")
    })
    @GetMapping
    public Mono<ResponseEntity<Response>> getReview(@RequestParam Move userMove, @RequestParam Move serverMove) {

        if (userMove.equals(serverMove)) {
            return Mono.just(ResponseEntity.badRequest().body(new Response("")));
        }
        return reviewProvider.getReview(userMove,serverMove)
                .flatMap(reviewText -> Mono.just(ResponseEntity.ok(new Response(reviewText))))
                .onErrorReturn(ResponseEntity.internalServerError().body(new Response("")));
    }

    public record Response (@Schema(description = "The string capturing the server's review of the play") String text) {}
}
