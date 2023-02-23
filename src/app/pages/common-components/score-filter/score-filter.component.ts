import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-filter',
  templateUrl: './score-filter.component.html',
  styleUrls: ['./score-filter.component.css']
})
export class ScoreFilterComponent implements OnInit {

  constructor() { }
  @Input() leagueData : any;
  @Input() activeLeague : any;
  @Output() sortData = new EventEmitter<any>();


  ngOnInit(): void {
  }

  filterLeague(name: any){
    this.sortData.emit(name);
  }

}
