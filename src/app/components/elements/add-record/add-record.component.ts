import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';
import { NewRound } from '../../../../core/models/new-round';
import { GameService } from '../../../../core/services/game.service';
import { Modifier } from '../../../../core/models/modifier';
import { Result } from '../../../../core/models/result';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  public newRound: NewRound;
  public result: Result;
  public modifiers: Array<Modifier>;

  constructor(public modalService: ModalService,
              public gameService: GameService) {
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
    this.addModifiers();
    this.initModifiers();
    console.log(this.newRound);
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

  public getAnnounced(modifier: Modifier): string {
    switch (modifier.announced) {
      case 0: {
        return 'Brez napovedi';
      }
      case 1: {
        return 'Napoved';
      }
    }
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
}
