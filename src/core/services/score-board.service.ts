import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Round, RoundList } from '../models/round';
import { NewRound } from '../models/new-round';
import { AuthenticationService } from './authentication.service';
import { Game } from '../models/game';

@Injectable()
export class ScoreBoardService {

  public roundList: Array<Round>;
  public lastRound: Round;

  private scoreBoardUri = environment.baseUri.concat('ScoreBoard/');

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  public getScoreBoard(gameId: string): Observable<RoundList> {
    const uri = this.scoreBoardUri.concat(gameId);
    return this.http
      .get(uri, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new RoundList(rsp));
  }

  public deleteLastround(gameId: string): Observable<RoundList> {
    const uri = this.scoreBoardUri.concat(gameId);
    return this.http
      .delete(uri, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp);
  }

  public postRound(round: NewRound): Observable<Round> {
    return this.http
      .post(this.scoreBoardUri, round, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Round(rsp));
  }

  public endGame(gameId: string): Observable<Game> {
    return this.http
      .post(this.scoreBoardUri + 'end/' + gameId, {}, {headers: this.authenticationService.getAuthorizationHeader()})
      .map(rsp => rsp)
      .map(rsp => new Game(rsp));
  }
}
