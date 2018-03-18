/**
 * Internal
 */
import { Component, OnInit } from '@angular/core';
/**
 * Services
 */
import { ModalService } from '../../../../core/services/render/modal.service';
import { GameService } from '../../../../core/services/game.service';
import { HttpService } from '../../../../core/services/http.service';
import { ScoreBoardService } from '../../../../core/services/score-board.service';
import { ToastService } from '../../../../core/services/render/toast.service';
/**
 * Models
 */
import { RoundList } from '../../../../core/models/round';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  constructor(public modalService: ModalService,
              private gameService: GameService,
              private httpService: HttpService,
              private scoreBoardService: ScoreBoardService,
              private toastService: ToastService) {
  }

  ngOnInit() {
  }

  public endGame() {
    this.scoreBoardService
      .getScoreBoard(this.gameService.currentGame.gameId)
      .subscribe(
        game => this.loadFinishedGame(game),
        error => this.httpService.handleError(error)
      );
  }

  private loadFinishedGame(game: RoundList): void {
    this.toastService.addToast('Obvestilo', 'Igra je bila uspešno zaključena!', 'success');
    this.modalService.close('endGame');
  }
}
