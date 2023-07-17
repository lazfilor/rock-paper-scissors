package com.filor.rps.handlers

import com.filor.rps.model.Move
import com.filor.rps.model.Play
import com.filor.rps.services.MetricService
import com.filor.rps.services.RandomPlayProvider
import org.spockframework.spring.SpringBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.web.reactive.server.WebTestClient
import spock.lang.Specification

@WebFluxTest
@ContextConfiguration(classes = [MoveHandler.class, RandomPlayProvider.class])
class MoveHandlerTest extends Specification {

    @SpringBean
    MetricService metricService = Mock()

    @Autowired
    private WebTestClient webTestClient

    def "Returns valid play on correct move request"() {
        expect:
        webTestClient.get().uri("/play/ROCK")
        .exchange()
        .expectStatus().isOk()
        .expectBody(Play.class)
        .consumeWith(resp -> {
            assert resp.getResponseBody().userMove() == Move.ROCK
            assert resp.getResponseBody().serverMove() != null
            assert resp.getResponseBody().result() != null
        })
    }

    def "Returns error on invalid move variable"() {
        expect:
        webTestClient.get().uri("/play/SPOCK")
                .exchange()
                .expectStatus().is4xxClientError()
    }

    def "Returns error on nonexistent move variable"() {
        expect:
        webTestClient.get().uri("/play")
                .exchange()
                .expectStatus().is4xxClientError()
    }
}
