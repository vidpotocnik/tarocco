import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../core/services/render/modal.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  constructor(public modalService: ModalService) {
  }

  ngOnInit() {

  }

}
