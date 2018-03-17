/**
 * Internal
 */
import { Component, OnInit } from '@angular/core';
/**
 * Services
 */
import { ModalService } from '../../../core/services/render/modal.service';
import { HttpService } from '../../../core/services/http.service';
import { GameService } from '../../../core/services/game.service';
import { ScoreBoardService } from '../../../core/services/score-board.service';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  /**
   * Property for masking page
   */
  public loading: boolean;

  constructor(public modalService: ModalService,
              public authenticationService: AuthenticationService,
              public gameService: GameService,
              public scoreBoardService: ScoreBoardService,
              private httpService: HttpService) {
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
    this.loading = true;
    this.scoreBoardService
      .getScoreBoard(gameId)
      .subscribe(
        entities => this.loadScoreBoard(entities),
        error => this.httpService.handleError(error)
      );
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
    this.scoreBoardService.lastRound = null;
    this.scoreBoardService.roundList = entities.data;
    this.scoreBoardService.roundList.forEach((c, i) => {
      c.isLast = i === this.scoreBoardService.roundList.length - 1;
      if (c.isLast) {
        this.scoreBoardService.lastRound = c;
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
    this.loading = false;
  }
}
