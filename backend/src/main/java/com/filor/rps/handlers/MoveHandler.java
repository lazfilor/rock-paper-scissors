package com.filor.rps.handlers;

import com.filor.rps.model.Move;
import com.filor.rps.model.Play;
import com.filor.rps.services.MetricService;
import com.filor.rps.services.PlayProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Handler represents entrypoint for web clients regarding play interaction
 */
@Slf4j
@RestController
@RequestMapping("/play")
public class MoveHandler {

    private final PlayProvider playProvider;

    private final MetricService metricService;

    @Autowired
    public MoveHandler(PlayProvider playProvider,
                       MetricService metricService) {
        this.playProvider = playProvider;
        this.metricService = metricService;
    }

    @GetMapping("/{move}")
    public Play getPlay(@PathVariable Move move) {
        Play play = playProvider.getPlay(move);
        log.info("User played {} against {}: {}", play.userMove(), play.serverMove(), play.result());
        metricService.incrementPlay(play);
        return play;
    }
}
