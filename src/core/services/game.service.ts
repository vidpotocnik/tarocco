import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Game, GameList } from '../models/game';

@Injectable()
export class GameService {
  public games: Array<Game>;
  public currentGame: Game;
  private scoreBoardUri = environment.baseUri.concat('Game/');

  public getGames(): Observable<Game> {
    return this.http
      .get(this.scoreBoardUri)
      .map(rsp => rsp)
      .map(rsp => new Game(rsp));
  }

  public getCurrentGame(): void {
    this.games.forEach((game, index) => {
      this.currentGame = game;
      if (index > 0 && this.games[index - 1].date > game.date) {
        this.currentGame = this.games[index - 1];
      }
    });
  }

  constructor(private http: HttpClient) {
  }
}
