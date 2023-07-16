package com.filor.rps.model;

/**
 * Creates a play, which represents the combination of the user's move, the server's counter-move and the respective game result
 * @param userMove the user's move
 * @param serverMove the server's move
 * @param result the play's result
 */
public record Play(Move userMove, Move serverMove, Result result) {
}
