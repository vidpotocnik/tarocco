import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/render/modal.service';
import { HttpService } from '../../../core/services/http.service';
import { GameService } from '../../../core/services/game.service';
import { ScoreBoardService } from '../../../core/services/score-board.service';
import { Round } from '../../../core/models/round';
import { Player } from '../../../core/models/player';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public roundList: Array<Round>;
  public lastRound: Round;

  constructor(public modalService: ModalService,
              public gameService: GameService,
              private httpService: HttpService,
              private scoreBoardService: ScoreBoardService) {
  }

  ngOnInit() {
    this.getGames();
  }

  public getGames(): void {
    this.gameService
      .getGames()
      .subscribe(
        entities => this.loadGames(entities),
        error => this.httpService.handleError(error)
      );
  }

  public getGame(gameId: string): void {
    this.gameService
      .getGame(gameId)
      .subscribe(
        entity => this.loadGame(entity),
        error => this.httpService.handleError(error)
      );
  }

  public getScoreBoard(gameId = this.gameService.currentGame.gameId): void {
    this.scoreBoardService
      .getScoreBoard(gameId)
      .subscribe(
        entities => this.loadScoreBoard(entities),
        error => this.httpService.handleError(error)
      );
  }

  public getOrderedPlayers(): Array<Player> {
    const result = [];
    this.lastRound.roundResults.forEach((r) => {
      this.gameService.currentGame.players.forEach((p) => {
        if (r.playerId === p.playerId) {
          result.push(p);
        }
      });
    });

    return result;
  }

  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
    this.gameService.getCurrentGame();
    this.getScoreBoard();
  }

  private loadGame(entity: any): void {
    this.gameService.currentGame = entity.data;
  }

  private loadScoreBoard(entities: any): void {
    /**
     * Last round needs to be undefined before rendering starts
     */
    this.lastRound = null;
    this.roundList = entities.data;
    this.roundList.forEach((c, i) => {
      c.isLast = i === this.roundList.length - 1;
      if (c.isLast) {
        this.lastRound = c;
      }
      c.roundResults.forEach((r) => {
        r.radelci = [];
        for (let k = 1; k <= r.playerRadelcCount; k++) {
          if (k <= r.playerRadelcUsed) {
            r.radelci.push(true);
          } else {
            r.radelci.push(false);
          }
        }
      });
    });
    this.getGame(this.gameService.currentGame.gameId);
  }
}
