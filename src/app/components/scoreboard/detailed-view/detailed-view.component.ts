import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../core/services/render/modal.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  @Input() detailedRound: any;

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit() {
  }

}
