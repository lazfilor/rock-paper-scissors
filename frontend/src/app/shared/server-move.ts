import {GameResult} from './game-result';

export interface ServerMove {
  moveId: string;
  result: GameResult;
}
