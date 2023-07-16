package com.filor.rps.services

import spock.lang.Specification

class RemoteReviewProviderTest extends Specification {

    def remoteReviewProvider = new RemoteReviewProvider(null);

    def "Should cleanse return string correctly"() {
        expect:
        remoteReviewProvider.cleanseReturnString("\"A string without double-quotes\"") == "A string without double-quotes"
        remoteReviewProvider.cleanseReturnString("'A string without single-quotes'") == "A string without single-quotes"
        remoteReviewProvider.cleanseReturnString("\n\n\nA string without newlines") == "A string without newlines"
        remoteReviewProvider.cleanseReturnString("\n\n\n\"A string without newlines or quotes\"") == "A string without newlines or quotes"
    }
}
