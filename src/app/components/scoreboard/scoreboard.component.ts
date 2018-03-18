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
import { TeamService } from '../../../core/services/team.service';
import { ScoreboardHub } from './scoreboardhub.components'
/**
 * Models
 */
import { Team } from '../../../core/models/team';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  private hub: ScoreboardHub;
  /**
   * Property for masking page
   */
  public loading: boolean;
  public team: Team;

  constructor(public modalService: ModalService,
              public authenticationService: AuthenticationService,
              public gameService: GameService,
              public scoreBoardService: ScoreBoardService,
              public teamService: TeamService,
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
    // after loading a game scoreboard also connect to hub for updates
    if (this.hub && this.gameService.currentGame.gameId !== this.hub.gameId) {
      this.hub.changeGame(this.gameService.currentGame.gameId);
    } else {
      this.hub = new ScoreboardHub(this.gameService.currentGame.gameId);
    }
    // handler of updateScoreBoard
    this.hub.onUpdateScoreBoard((p) => {
      console.log('[scoreboard.component] new round:');
      console.log(p);
      this.getScoreBoard(); // TODO no need to call GET, just add it...
      window.scrollTo(0, document.body.scrollHeight); // or some way to scroll to the newly added round
    });
    this.hub.StartHub();
  }

  public mask(): void {
    this.loading = true;
  }

  public unmask(): void {
    this.loading = false;
  }

  public newGame() {
    this.team = this.teamService.retreiveTeam();
    this.modalService.open('newGame');
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
