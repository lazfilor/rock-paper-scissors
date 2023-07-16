package com.filor.rps.services;


import com.filor.rps.model.Play;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Service encapsulates logic for maintaining metrics on play statistics
 */
@Service
public class MetricService {

    public static final String PLAY_METER = "rps.play";

    public static final String USER_TAG = "user";

    public static final String SERVER_TAG = "server";

    public static final String RESULT_TAG = "result";

    private final MeterRegistry meterRegistry;

    private final Map<Play, Counter> counterMap = new ConcurrentHashMap<>();

    @Autowired
    public MetricService(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
    }

    /**
     * Increments the play metric using a respective {@link Play}
     * @param play the play that occurred
     */
    public void incrementPlay(Play play) {
        counterMap.computeIfAbsent(play, this::createCounterForPlay).increment();
    }

    private Counter createCounterForPlay(Play play) {
        return meterRegistry.counter(PLAY_METER, USER_TAG, play.userMove().name(), SERVER_TAG, play.serverMove().name(), RESULT_TAG, play.result().name());
    }

}
