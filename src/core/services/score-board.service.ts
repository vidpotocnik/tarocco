import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Round, RoundList } from '../models/round';
import { NewRound } from "../models/new-round";

@Injectable()
export class ScoreBoardService {

  public roundList: Array<Round>;
  public lastRound: Round;

  private scoreBoardUri = environment.baseUri.concat('ScoreBoard/');

  constructor(private http: HttpClient) {
  }

  public getScoreBoard(gameId: string): Observable<RoundList> {
    const uri = this.scoreBoardUri.concat(gameId);
    return this.http
      .get(uri)
      .map(rsp => rsp)
      .map(rsp => new RoundList(rsp));
  }

  public postRound(round: NewRound): Observable<Round> {
    return this.http
      .post(this.scoreBoardUri, round)
      .map(rsp => rsp)
      .map(rsp => new Round(rsp));
  }
}
