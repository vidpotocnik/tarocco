import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';
import { RoundList } from '../models/round';

@Injectable()
export class ScoreBoardService {
    private scoreBoardUri = environment.baseUri.concat('ScoreBoard/');

    public getScoreBoard(gameId: string): Observable<RoundList> {
        const uri = this.scoreBoardUri.concat(gameId);
        return this.http
            .get(uri)
            .map(rsp => rsp)
            .map(rsp => new RoundList(rsp));
    }

    constructor(private http: HttpClient) {
    }
}
