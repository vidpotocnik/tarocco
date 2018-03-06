import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import { ScoreBoardList } from '../models/score-board';

@Injectable()
export class ScoreBoardService {
    private scoreBoardUri = environment.baseUri.concat('ScoreBoard/');

    public getScoreBoard(gameId: string): Observable<ScoreBoardList> {
        const uri = this.scoreBoardUri.concat(gameId);
        return this.http
            .get(uri)
            .map(rsp => rsp)
            .map(rsp => new ScoreBoardList(rsp));
    }

    constructor(private http: HttpClient) {
    }
}
