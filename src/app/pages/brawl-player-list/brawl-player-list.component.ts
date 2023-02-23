import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { Status } from 'src/app/constant';
import { TimeFormat } from 'src/app/service/validation/timeformat';
@Injectable({
  providedIn: 'root' // just before your class
})
@Component({
  selector: 'app-brawl-player-list',
  templateUrl: './brawl-player-list.component.html',
  styleUrls: ['./brawl-player-list.component.css']
})
export class BrawlPlayerListComponent implements OnInit {
  @Input() totalCount: number;
  @Input() showGameData: any;
  @Output() gameData = new EventEmitter();
  @Output() gameDataNew = new EventEmitter();
  @Output() playerCount = new EventEmitter();
  public playerSelectionForm: FormGroup;
  columnOne: any = ["GoalsNHL", "PointsNBA", "PointsCBB", "Pitching HitsMLB", "HitsMLB" , "ScorePGA" , "Total TouchdownsNFL" , "Total TouchdownsCFB"];
  columnTwo: any = ["AssistsNHL", "ReboundsNBA","ReboundsCBB", "Pitching RunsMLB" , "RunsMLB" , "Total YardsNFL" , "Total YardsCFB"];
  columnThree: any = ["Shots on GoalNHL", "AssistsNBA", "AssistsCBB","Pitching StrikeoutsMLB", "StrikeoutsMLB" , "Passing InterceptionsNFL" , "Passing InterceptionsCFB"];
  status: any = Status;
  playersData: any;
  leagueName: any;

  public playerData: any = [
    {
      brawlsId: 267,
      createdat: "2022-04-20 11:09:17",
      date: "2022-04-21T19:30:00",
      gameId: 18026,
      image_url: "assets/images/avatar.jpg",
      league: "NBA",
      moneyline_point: "1.5",
      moneyline_value: "-125",
      runspread_point: "2.85",
      runspread_value: "110",
      teamId: "MEM",
      player_name: "C. Hadley",
      total_point: "2.60",
      total_value: "-110",
      updatedat: "2022-04-20 11:09:17",
      _id: 15225
    },
    {
      brawlsId: 268,
      createdat: "2022-04-20 11:09:17",
      date: "2022-04-21T19:30:00",
      gameId: 18027,
      image_url: "assets/images/avatar.jpg",
      league: "NBA",
      moneyline_point: "2.5",
      moneyline_value: "125",
      runspread_point: "3.85",
      runspread_value: "-110",
      teamId: "MEM",
      player_name: "A. Hadley",
      total_point: "3.60",
      total_value: "110",
      updatedat: "2022-04-20 11:09:17",
      _id: 15226
    },
    {
      brawlsId: 269,
      createdat: "2022-04-20 11:09:17",
      date: "2022-04-21T19:30:00",
      gameId: 18026,
      image_url: "assets/images/avatar.jpg",
      league: "NBA",
      moneyline_point: "1.5",
      moneyline_value: "-125",
      runspread_point: "2.85",
      runspread_value: "110",
      teamId: "MEM",
      player_name: "B. Hadley",
      total_point: "2.60",
      total_value: "-110",
      updatedat: "2022-04-20 11:09:17",
      _id: 15225
    }
  ]
  newPlayerData: any;

  constructor(private _fb: FormBuilder, private timeFormat:TimeFormat, public toastr: ToastrServiceProvider) { }

  ngOnInit(): void {    
    this.playersData = this.showGameData.details.players;
    this.leagueName = this.showGameData?.league;
    this.newPlayerData = this.playersData;    
    this.playerSelectionForm = this._fb.group({
      runspread: [''],
      total: [''],
      moneyline: [''],
    });
  }

  transformDate(data:any){    
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix
  }

  onChangeEvent(event: any, item: any, index: any, type: any, playerScoreKey: any) {
    const elementId = event.target.id
    if (event.target.checked) {
      this.newPlayerData[index][type] = true;   
      item[type] = true;
      if(this.totalCount < 5){
        this.totalCount = this.totalCount + 1;
        this.addData(item, type, index, 'add', playerScoreKey);
      } else {
        const myElement = document.getElementById(elementId) as HTMLInputElement;
        myElement.checked = false;
        this.newPlayerData[index][type] = false;
        item[type] = false;
        this.toastr.error(this.status.MAXIMUM_BRAWLS_SELECT.name);
      }
      // this.addData(item, type, index, 'update');
    } else {
      this.newPlayerData[index][type] = false;
      item[type] = false;
      this.totalCount = this.totalCount - 1;
      this.addData(item, type, index, 'remove', playerScoreKey);
    }
  }

  addData(item: any, type: any, index: any, method: any, playerScoreKey: any){
    var point: any;
    var dataKey: any;
    var match_Id: any;
    item.list.forEach((element: any) => {
      if(playerScoreKey == element.key){        
        point = element.point;
        dataKey = element.key;
        match_Id = element._id
      }
    });
    var object = {
      data: item,
      position: method,
      index: index,
      point: point,
      dataKey: dataKey,
      match_Id : match_Id,
      key: 'player',
      type: type ,
      selection : 'over'
    }
    this.gameData.emit(object);
    this.playerCount.emit(this.totalCount);
    this.gameDataNew.emit(this.newPlayerData);
  }

  removePlayerData(removeData: any,data:any){
    this.newPlayerData = data;
    this.newPlayerData[removeData.index][removeData.type] = false;
    this.gameDataNew.emit(this.newPlayerData);    
    this.playerCount.emit(this.totalCount);
    this.gameDataNew.emit(this.newPlayerData);
  }

  clearAll(data:any){
    this.newPlayerData = data;
    this.newPlayerData.forEach((element: any, index: any) => {
      element.firstColumn = false;
      element.secondColumn = false;
      element.thirdColumn = false;
    });
    this.gameDataNew.emit(this.newPlayerData);
    this.totalCount = 0;
    this.playerCount.emit(this.totalCount);    
  }

}
