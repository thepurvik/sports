import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-league-filter',
  templateUrl: './league-filter.component.html',
  styleUrls: ['./league-filter.component.css']
})
export class LeagueFilterComponent implements OnInit {

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
