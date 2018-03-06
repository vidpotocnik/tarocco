import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';

@Component({
  selector: 'app-game-record',
  templateUrl: './game-record.component.html',
  styleUrls: ['./game-record.component.css']
})
export class GameRecordComponent implements OnInit {

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {

  }

}
