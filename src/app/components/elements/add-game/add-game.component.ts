import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';
import { NewGame } from '../../../../core/models/new-game';
import { GameService } from '../../../../core/services/game.service';
import { HttpService } from '../../../../core/services/http.service';
import { ToastService } from '../../../../core/services/render/toast.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  public newGame: NewGame;
  @Output() gameChanged = new EventEmitter();

  constructor(
    public modalService: ModalService,
    public gameService: GameService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.newGame = NewGame.init({name: '', players: [{name: ''}, {name: ''}, {name: ''}, {name: ''}]});
  }

  public makeNewGame(): void {
    this.gameService
      .postGame(this.newGame)
      .subscribe(
        entity => this.loadGame(entity),
        error => this.httpService.handleError(error)
      );
  }

  private loadGame(entity: any): void {
    /**
     * Whenever a new game is created it becomes active, and it's appended to the other games.
     */
    this.gameService.currentGame = entity.data;
    this.gameService.games.push(this.gameService.currentGame);
    this.gameChanged.next();
    this.modalService.close('newGame');
    this.toastService.addToast(
      'Obvestilo',
      'Nova igra uspešno dodana!',
      'success'
    );
  }
}
