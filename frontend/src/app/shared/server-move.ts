import {GameResult} from './game-result';
import {MoveId} from './move-id';

export interface ServerMove {
  move: MoveId;
  result: GameResult;
}
