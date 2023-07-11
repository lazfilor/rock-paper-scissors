package com.filor.rps.services;

import com.filor.rps.model.Move;
import com.filor.rps.model.Result;
import lombok.NonNull;
import reactor.core.publisher.Mono;


/**
 * Use this class for generating a server response for a specific game result
 */
public abstract class ReviewProvider {

    /**
     * Returns a review for the provided game configuration
     * @param userMove the user's move
     * @param serverMove the server's move
     * @return a review
     */
    public Mono<String> getReview(@NonNull Move userMove, @NonNull Move serverMove) {
        Result result = userMove.getResult(serverMove);

        if (Result.TIE.equals(result)) {
            return Mono.empty();
        }
        return Result.WIN.equals(result) ? getCongratulations(userMove, serverMove) : getRoast(userMove, serverMove);
    }

    /**
     * This method's implementation should return a roast, which is appropriate for the respective configuration
     * @param userMove the user's move
     * @param serverMove the server's move
     * @return a roast
     */
    protected abstract Mono<String> getRoast(Move userMove, Move serverMove);

    /**
     * This method's implementation should return a congratulation, which is appropriate for the respective configuration
     * @param userMove the user's move
     * @param serverMove the server's move
     * @return a congratulation
     */
    protected abstract Mono<String> getCongratulations(Move userMove, Move serverMove);
}
