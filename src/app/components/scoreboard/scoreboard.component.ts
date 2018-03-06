import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/render/modal.service';
import { HttpService } from '../../../core/services/http.service';
import { GameService } from '../../../core/services/game.service';
import { ScoreBoardService } from '../../../core/services/score-board.service';
import { RoundList } from '../../../core/models/round';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public roundList: RoundList;

  constructor(public modalService: ModalService,
              private httpService: HttpService,
              private gameService: GameService,
              private scoreBoardService: ScoreBoardService) {
  }

  ngOnInit() {
    this.getScoreBoard('5d8486cd-6e3b-4ffc-8c9b-e14ff5c2d2c1');
  }


  public getScoreBoard(gameId: string): void {
    this.scoreBoardService
      .getScoreBoard(gameId)
      .subscribe(
        entities => this.loadScoreBoard(entities),
        error => this.httpService.handleError(error)
      );
  }

  private loadScoreBoard(entities: any): void {
    this.roundList = entities.data;
    console.log(this.roundList);
  }

}
