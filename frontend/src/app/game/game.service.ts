import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MoveId} from '../shared/move-id';
import {ReviewResponse} from '../shared/review-response';
import {ServerMove} from '../shared/server-move';
import {environment} from '../../environments/environment';
import {PlayResponse} from "../shared/play-response";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public static readonly REVIEW_ENDPOINT: string = 'review';

  public static readonly PLAY_ENDPOINT: string = 'play';

  public static readonly USER_MOVE_PARAM: string = 'userMove';

  public static readonly SERVER_MOVE_PARAM: string = 'serverMove';


  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getServerMove(userMove: MoveId): Observable<ServerMove> {

    if (userMove === null || userMove === MoveId.HIDDEN) {
      return throwError(() => new Error("Can not get server play for hidden move"));
    }
    return this.httpClient.get<PlayResponse>(`${this.apiUrl}/${GameService.PLAY_ENDPOINT}/${userMove}`).pipe(
      map(resp => {
        if (!resp.serverMove || !resp.result) {
          throw new Error("Empty play values");
        }
        return {result: resp.result, move: resp.serverMove};
      })
    );
  }

  getReview(userMove: MoveId, serverMove: MoveId): Observable<string> {

    if (userMove === null || userMove === MoveId.HIDDEN || serverMove === null || serverMove === MoveId.HIDDEN) {
      return throwError(() => new Error("Can not get review for hidden move"));
    }
    const params = {[GameService.USER_MOVE_PARAM]: userMove, [GameService.SERVER_MOVE_PARAM]: serverMove};

    return this.httpClient.get<ReviewResponse>(`${this.apiUrl}/${GameService.REVIEW_ENDPOINT}`, {params: params}).pipe(
      map(resp => {
        if (!resp.text) {
          throw new Error("Empty review text");
        }
        return resp.text;
      })
    );
  }
}
