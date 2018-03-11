import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';
import { GameService } from '../../../../core/services/game.service';
import { HttpService } from '../../../../core/services/http.service';
import { ScoreBoardService } from '../../../../core/services/score-board.service';
import { Modifier } from '../../../../core/models/modifier';
import { Result } from '../../../../core/models/result';
import { NewRound } from '../../../../core/models/new-round';
import { ToastService } from "../../../../core/services/render/toast.service";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  public newRound: NewRound;
  public result: Result;
  public modifiers: Array<Modifier>;
  @Output() refreshScoreBoard = new EventEmitter();

  constructor(public modalService: ModalService,
              public gameService: GameService,
              private scoreBoardService: ScoreBoardService,
              private toastService: ToastService,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.newRound = NewRound.init();
    this.result = Result.init();
    this.initModifiers();
  }

  public toggleModifier(modifier: Modifier): void {
    switch (modifier.team) {
      case -1: {
        modifier.team = 0;
        break;
      }
      case 0: {
        modifier.team = 1;
        break;
      }
      case 1: {
        modifier.team = -1;
        break;
      }
    }
  }

  public addModifiers(): void {
    if (!this.newRound.modifiers) {
      this.newRound.modifiers = [];
    }
    this.modifiers.forEach((m) => {
      if (m.team !== 0) {
        this.newRound.modifiers.push(m);
      }
    });
  }

  public addNewRound() {
    this.newRound.gameId = this.gameService.currentGame.gameId;
    this.addModifiers();
    this.postRound();
    this.initModifiers();
    this.modalService.close('gameRecord');
  }

  public incrementContraFactor(modifier: Modifier): void {
    modifier.contraFactor = (modifier.contraFactor * 2);
    if (modifier.contraFactor > 16) {
      modifier.contraFactor = 1;
    }
  }

  public incrementAnnounced(modifier: Modifier): void {
    modifier.announced = (modifier.announced + 1) % 2;
  }

  public getFactorMessage(modifier: Modifier): string {
    switch (modifier.contraFactor) {
      case 1: {
        return 'Brez kontre';
      }
      case 2: {
        return 'Kontra';
      }
      case 4: {
        return 'Re';
      }
      case 8: {
        return 'Sub';
      }
      case 16: {
        return 'Mort';
      }
    }
  }

  public postRound(): void {
    this.scoreBoardService
      .postRound(this.newRound)
      .subscribe(
        entity => this.loadRound(),
        error => this.httpService.handleError(error)
      );
  }



  private initModifiers(): void {
    this.modifiers = [
      Modifier.init({modifierType: 'trula'}),
      Modifier.init({modifierType: 'kralji'}),
      Modifier.init({modifierType: 'kralj_ultimo'}),
      Modifier.init({modifierType: 'pagat_ultimo'}),
      Modifier.init({modifierType: 'barvni_valat'}),
      Modifier.init({modifierType: 'valat'})
    ];
  }

  public initKlopResults(): void {
    if (!this.scoreBoardService.lastRound) {
      return;
    }
    const klopResults = [];
    this.scoreBoardService.lastRound.roundResults.forEach((r) => {
      klopResults.push({playerId: r.playerId, score: 0});
    });
    this.newRound.klopResults = klopResults;
  }

  private loadRound(): void {
    this.refreshScoreBoard.next();
    this.initModifiers();
    this.newRound = NewRound.init();
    this.toastService.addToast(
      'Obvestilo',
      'Nova runda uspešno dodana!',
      'success'
    );
  }
}
