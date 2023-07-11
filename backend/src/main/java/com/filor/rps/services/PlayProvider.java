package com.filor.rps.services;

import com.filor.rps.model.Move;
import com.filor.rps.model.Play;

/**
 * Interface can be used to provide server responses and results for respective user moves, terminating one play
 */
public interface PlayProvider {

    /**
     * This method should return the play resulting from this server's response to the user's move
     * @param playerMove the user's move
     * @return a nonnull play
     */
    Play getPlay(Move playerMove);
}
