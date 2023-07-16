package com.filor.rps.model;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Creates a play, which represents the combination of the user's move, the server's counter-move and the respective game result
 * @param userMove the user's move
 * @param serverMove the server's move
 * @param result the play's result
 */
public record Play(@Schema(description = "The move provided by a user") Move userMove,
                   @Schema(description = "The move computed by the server") Move serverMove,
                   @Schema(description = "The result of playing the user's against the server's move, from the user's perspective") Result result) {
}
