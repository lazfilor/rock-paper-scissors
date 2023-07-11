package com.filor.rps.model;


import lombok.NonNull;

import java.util.Map;

/**
 * Enum contains all moves that both users and this server can make
 */
public enum Move {
    ROCK,
    PAPER,
    SCISSORS;

    private static final Map<Move, Move> WINNING_COMBINATIONS = Map.of(
            Move.ROCK, Move.SCISSORS,
            Move.PAPER, Move.ROCK,
            Move.SCISSORS, PAPER
    );

    /**
     * Returns the result of countering this move with another one, from the perspective of this move
     * @param otherMove the other move
     * @return the result of both moves, regarding this move
     */
    public Result getResult(@NonNull Move otherMove) {

        if (otherMove.equals(this)) {
            return Result.TIE;
        }
        return otherMove.equals(WINNING_COMBINATIONS.get(this)) ? Result.WIN : Result.LOSS;
    }
}
