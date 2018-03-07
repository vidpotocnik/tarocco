import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';
import { NewRound } from '../../../../core/models/new-round';
import { GameService } from '../../../../core/services/game.service';
import { Modifier } from '../../../../core/models/modifier';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  public newRound: NewRound;
  public modifiers = [
    Modifier.init({modifierType: 'TRULA'}),
    Modifier.init({modifierType: 'K. ULTIMA'}),
    Modifier.init({modifierType: 'P. ULTIMA'}),
    Modifier.init({modifierType: 'KRALJI'}),
    Modifier.init({modifierType: 'VALAT'}),
    Modifier.init({modifierType: 'B. VALAT'})

  ];

  constructor(
    public modalService: ModalService,
    public gameService: GameService
  ) {
  }

  ngOnInit() {
    this.newRound = NewRound.init();
  }

  public toggleModifier(modifier: Modifier): void {
    modifier.isActive = !modifier.isActive;
  }

  public addModifier(modifier: Modifier): void {
    if (!this.newRound.modifiers) {
      this.newRound.modifiers = [];
    }
    this.modifiers.forEach((m) => {
      if (m.isActive) {
        this.newRound.modifiers.push(m);
      }
    });
  }

  public addNewRound() {
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
}
