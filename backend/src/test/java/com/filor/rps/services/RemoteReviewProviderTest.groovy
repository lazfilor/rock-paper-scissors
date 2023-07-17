package com.filor.rps.services

import com.filor.rps.model.Move
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException
import spock.lang.Shared
import spock.lang.Specification

class RemoteReviewProviderTest extends Specification {

    @Shared
    def mockWebServer = new MockWebServer()
    def remoteReviewProvider = new RemoteReviewProvider(WebClient.create(mockWebServer.url("/").toString()))

    def setupSpec() {
        mockWebServer.start();
    }

    def cleanupSpec() {
        mockWebServer.shutdown();
    }

    def "should receive non-empty review when request successful"() {
        setup:
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(200)
                .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .setBody("{\"choices\": [{\"text\": \"A congrats\"}]}"))
        expect:
        remoteReviewProvider.getReview(Move.PAPER, Move.SCISSORS).block() == "A congrats"
    }

    def "should receive error when request unsuccessful"() {
        setup:
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(404)
                .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
        when:
        remoteReviewProvider.getReview(Move.PAPER, Move.SCISSORS).block()
        then:
        thrown(WebClientResponseException)
    }

    def "should receive error when empty response"() {
        setup:
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(200)
                .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .setBody("{\"choices\": [{\"text\": \"\"}]}"))
        when:
        remoteReviewProvider.getReview(Move.PAPER, Move.SCISSORS).block()
        then:
        thrown(IllegalStateException)
    }

    def "should receive error when tied moves provided"() {
        setup:
        mockWebServer.enqueue(new MockResponse()
                .setResponseCode(200)
                .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
                .setBody("{\"choices\": [{\"text\": \"Ein Text\"}]}"))
        when:
        remoteReviewProvider.getReview(Move.PAPER, Move.PAPER).block()
        then:
        thrown(IllegalArgumentException)
    }

    def "Should cleanse return string correctly"() {
        expect:
        remoteReviewProvider.cleanseReturnString("\"A string without double-quotes\"") == "A string without double-quotes"
        remoteReviewProvider.cleanseReturnString("'A string without single-quotes'") == "A string without single-quotes"
        remoteReviewProvider.cleanseReturnString("\n\n\nA string without newlines") == "A string without newlines"
        remoteReviewProvider.cleanseReturnString("\n\n\n\"A string without newlines or quotes\"") == "A string without newlines or quotes"
    }
}
