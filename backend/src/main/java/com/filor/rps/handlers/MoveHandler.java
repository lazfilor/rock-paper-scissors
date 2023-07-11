package com.filor.rps.handlers;

import com.filor.rps.model.Move;
import com.filor.rps.model.Play;
import com.filor.rps.services.PlayProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/play")
public class MoveHandler {

    private final PlayProvider playProvider;

    @Autowired
    public MoveHandler(PlayProvider playProvider) {
        this.playProvider = playProvider;
    }

    @GetMapping("/{move}")
    public Play getPlay(@PathVariable Move move) {
        Play play = playProvider.getPlay(move);
        log.info("User played {} against {}: {}", move, play.move(), play.result());
        return play;
    }
}
