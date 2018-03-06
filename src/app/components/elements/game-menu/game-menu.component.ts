import { Component, OnInit } from '@angular/core';
import { DropDownService } from '../../../../core/services/render/dropdown.service';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {

  constructor(public dropDownService: DropDownService) { }

  ngOnInit() {
  }

}
