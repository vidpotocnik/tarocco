import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/render/modal.service';
import { HttpService } from '../../../core/services/http.service';
import { GameService } from '../../../core/services/game.service';
import { ScoreBoardService } from '../../../core/services/score-board.service';
import { Round, RoundList } from '../../../core/models/round';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public roundList: Array<Round>;
  public lastRound: Round;

  constructor(public modalService: ModalService,
              private httpService: HttpService,
              private gameService: GameService,
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

  private loadGames(entities: any): void {
    this.gameService.games = entities.data;
    this.gameService.getCurrentGame();
    this.getScoreBoard();
  }

  public getScoreBoard(gameId = this.gameService.currentGame.gameId): void {
    this.scoreBoardService
      .getScoreBoard(gameId)
      .subscribe(
        entities => this.loadScoreBoard(entities),
        error => this.httpService.handleError(error)
      );
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
    console.log(this.lastRound);
  }
}
