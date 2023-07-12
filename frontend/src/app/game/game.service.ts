import {Injectable} from '@angular/core';
import {map, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MoveId} from '../shared/move-id';
import {ReviewResponse} from './models/review-response';
import {ServerMove} from '../shared/server-move';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public static readonly REVIEW_ENDPOINT: string = 'review';

  public static readonly PLAY_ENDPOINT: string = 'play';

  public static readonly USER_MOVE_PARAM: string = 'userMove';

  public static readonly SERVER_MOVE_PARAM: string = 'serverMove';


  private apiUrl: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getServerMove(userMove: MoveId): Observable<ServerMove> {

    if (userMove === null || userMove === MoveId.HIDDEN) {
      return throwError(() => new Error("Can not get server play for hidden move"));
    }
    return this.httpClient.get<ServerMove>(`${this.apiUrl}/${GameService.PLAY_ENDPOINT}/${userMove}`);
  }

  getReview(userMove: MoveId, serverMove: MoveId): Observable<string> {

    if (userMove === null || userMove === MoveId.HIDDEN || serverMove === null || serverMove === MoveId.HIDDEN) {
      return throwError(() => new Error("Can not get review for hidden move"));
    }
    const params = {[GameService.USER_MOVE_PARAM]: userMove, [GameService.SERVER_MOVE_PARAM]: serverMove};

    return this.httpClient.get<ReviewResponse>(`${this.apiUrl}/${GameService.REVIEW_ENDPOINT}`, {params: params}).pipe(
      map(resp => resp.test)
    );
  }
}
