package com.filor.rps.services

import com.filor.rps.model.Move
import spock.lang.Specification

class LocalReviewProviderTest extends Specification {

    def provider = new LocalReviewProvider();

    def "Returns non-empty roast"() {
        expect:
        provider.getRoast(Move.PAPER, Move.SCISSORS).block().length() > 0
    }

    def "Returns non-empty congrats"() {
        provider.getRoast(Move.PAPER, Move.ROCK).block().length() > 0
    }
}
