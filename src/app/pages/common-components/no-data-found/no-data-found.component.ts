import { Component, OnInit } from '@angular/core';
import { Status } from '../../../constant';

@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.css']
})
export class NoDataFoundComponent implements OnInit {
  status: any = Status;

  constructor() { }

  ngOnInit(): void {
  }

}
