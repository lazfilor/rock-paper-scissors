package com.filor.rps.services

import com.filor.rps.model.Move
import spock.lang.Specification

class LocalReviewProviderTest extends Specification {

    def provider = new LocalReviewProvider();

    def "Throws if moves are tied"() {
        when:
        provider.getReview(Move.PAPER, Move.PAPER).block()
        then:
        thrown(IllegalArgumentException)
    }

    def "Returns non-empty review"() {
        expect:
        provider.getReview(Move.PAPER, Move.SCISSORS).block().length() > 0
    }
}
