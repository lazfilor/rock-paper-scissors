package com.filor.rps.model;

/**
 * Creates a play, which represents the server's counterpart of a client's move, i.e., the server's move and the result
 * @param move
 * @param result
 */
public record Play(Move move, Result result) {
}
