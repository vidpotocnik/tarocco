import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { Game } from '../models/game';
import { NewGame } from '../models/new-game';
import { Player } from '../models/player';
import { ScoreBoardService } from './score-board.service';

@Injectable()
export class GameService {
  public games: Array<Game>;
  public currentGame: Game;
  private gameUri = environment.baseUri.concat('Game/');

  public getGames(): Observable<Game> {
    return this.http
      .get(this.gameUri)
      .map(rsp => rsp)
      .map(rsp => new Game(rsp));
  }

  public postGame(newGame: NewGame): Observable<Game> {
    return this.http
      .post(this.gameUri, newGame)
      .map(rsp => rsp)
      .map(rsp => new Game(rsp));
  }

  public getGame(gameId: string): Observable<Game> {
    return this.http
      .get(this.gameUri + gameId)
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

  public getOrderedPlayers(): Array<Player> {
    if (!this.currentGame.players) {
      return;
    }
    const result = [];
    this.scoreBoardService.lastRound.roundResults.forEach((r) => {
      this.currentGame.players.forEach((p) => {
        if (r.playerId === p.playerId) {
          result.push(p);
        }
      });
    });

    return result;
  }

  constructor(private http: HttpClient, private scoreBoardService: ScoreBoardService) {
  }
}
