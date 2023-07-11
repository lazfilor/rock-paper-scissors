package com.filor.rps.services;

import com.filor.rps.model.Move;
import reactor.core.publisher.Mono;

/**
 * Provides statically defined reviews
 */
public class LocalReviewProvider extends ReviewProvider {

    public static final String ROAST_MESSAGE = "Maybe next time!";

    public static final String CONGRATS_MESSAGE = "Well done!";

    @Override
    protected Mono<String> getRoast(Move userMove, Move serverMove) {
        return Mono.just(ROAST_MESSAGE);
    }

    @Override
    protected Mono<String> getCongratulations(Move userMove, Move serverMove) {
        return Mono.just(CONGRATS_MESSAGE);
    }
}
