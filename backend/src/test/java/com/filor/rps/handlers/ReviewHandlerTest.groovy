package com.filor.rps.handlers

import com.filor.rps.services.LocalReviewProvider
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.reactive.server.WebTestClient
import spock.lang.Specification

@WebFluxTest
@ContextConfiguration(classes = [ReviewHandler.class, LocalReviewProvider.class])
class ReviewHandlerTest extends Specification {

    @Autowired
    private WebTestClient webTestClient

    def "Returns valid review on correct review request"() {
        expect:
        webTestClient.get().uri("/review?userMove=ROCK&serverMove=SCISSORS")
        .exchange()
        .expectStatus().isOk()
        .expectBody(ReviewHandler.Response.class)
        .consumeWith(resp -> {
            assert resp.getResponseBody().text().length() > 0
        })
    }

    def "Returns error on incomplete move parameters"() {
        expect:
        webTestClient.get().uri("/review?userMove=ROCK")
                .exchange()
                .expectStatus().is4xxClientError()
        webTestClient.get().uri("/review?serverMove=ROCK")
                .exchange()
                .expectStatus().is4xxClientError()
        webTestClient.get().uri("/review")
                .exchange()
                .expectStatus().is4xxClientError()
    }

    def "Returns error on invalid move parameters"() {
        expect:
        webTestClient.get().uri("/review?userMove=SPOCK&serverMove=LIZARD")
                .exchange()
                .expectStatus().is4xxClientError()
    }

    def "Returns error on tie move parameters"() {
        expect:
        webTestClient.get().uri("/review?userMove=ROCK&serverMove=ROCK")
                .exchange()
                .expectStatus().is4xxClientError()
    }
}
