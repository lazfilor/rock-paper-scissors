package com.filor.rps.handlers;

import com.filor.rps.model.Move;
import com.filor.rps.model.Play;
import com.filor.rps.services.MetricService;
import com.filor.rps.services.PlayProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "Get server's random move and the respective play result for the user's move")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Server's move resulted in a valid play", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = Play.class))
            }),
            @ApiResponse(responseCode = "400", description = "Invalid configuration of the move path-variable", content = @Content)
    })
    @GetMapping("/{move}")
    public Play getPlay(@PathVariable Move move) {
        Play play = playProvider.getPlay(move);
        log.info("User played {} against {}: {}", play.userMove(), play.serverMove(), play.result());
        metricService.incrementPlay(play);
        return play;
    }
}
