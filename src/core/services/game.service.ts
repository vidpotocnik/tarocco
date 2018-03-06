import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Game, GameList } from '../models/game';

@Injectable()
export class GameService {
  public games: GameList;
  public currentGame: Game;
  private scoreBoardUri = environment.baseUri.concat('Game/');

  public getGames(): Observable<GameList> {
    return this.http
      .get(this.scoreBoardUri)
      .map(rsp => rsp)
      .map(rsp => new GameList(rsp));
  }

  public getCurrentGame(): void {
    this.games.data.forEach((game, index) => {
      this.currentGame = game;
      if (index > 0 && this.games.data[index - 1].date > game.date) {
        this.currentGame = this.games.data[index - 1];
      }
    });
  }

  constructor(private http: HttpClient) {
  }
}
