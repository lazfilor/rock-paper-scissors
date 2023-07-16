package com.filor.rps.services;

import com.filor.rps.model.Move;
import com.filor.rps.model.Play;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;

/**
 * Class computes server's responses to user's moves based on random integers
 */
@Service
public class RandomPlayProvider implements PlayProvider {

    @Override
    public Play getPlay(Move playerMove) {
        Move[] moves = Move.values();
        Move serverMove = moves[ThreadLocalRandom.current().nextInt(0, moves.length)];
        return new Play(playerMove, serverMove, playerMove.getResult(serverMove));
    }
}
