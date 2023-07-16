import {MoveId} from "./move-id";
import {GameResult} from "./game-result";

export interface PlayResponse {
  userMove: MoveId,
  serverMove: MoveId,
  result: GameResult;
}
