import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
enum CheckBoxType { NONE };
import { ToastrServiceProvider } from '../../../service/validation/toaster'
import { Status } from 'src/app/constant';
import { TimeFormat } from 'src/app/service/validation/timeformat';
@Injectable({
  providedIn: 'root' // just before your class
})
@Component({
  selector: 'app-brawls-teams-list',
  templateUrl: './brawls-teams-list.component.html',
  styleUrls: ['./brawls-teams-list.component.css']
})
export class BrawlsTeamsListComponent implements OnInit {
  @Input() showGameData: any;
  @Input() teamsCheck: number;
  @Output() gameData = new EventEmitter();
  @Output() gameDataNew = new EventEmitter();
  @Output() teamCount = new EventEmitter();

  public teamSelectionForm: FormGroup;
  btnDisabled = false;
  check_box_type = CheckBoxType;
  newDataCollection: any = [];
  currentlyChecked: CheckBoxType;
  checkDataCollection: any = [];
  loadTeamStatus: any = [];
  passObj: any = [];
  temp: any = [];
  gameSelectLength = 5;
  status: any = Status;

  constructor(private _fb: FormBuilder, public toastr: ToastrServiceProvider,private timeFormat:TimeFormat) { }

  ngOnInit(): void {    
    this.teamSelectionForm = this._fb.group({
      runspread: [''],
      total: [''],
      moneyline: [''],
    });
    this.newDataCollection = this.showGameData;    
  };

  transformDate(data:any){    
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix
  }

  // checkValid(checkedType: any) {
  //   return new Promise(async (resolve, reject) => {
  //     var countTeam = 0;
  //     await this.newDataCollection.details.forEach((element: any, i: any) => {
  //       element.match.forEach((newElement: any) => {
  //         if (newElement[checkedType]) {
  //           this.teamsCheck.push(newElement);
  //         }
  //       });
  //     });

  //     await this.teamsCheck.forEach((elements: any) => {
  //       if (elements.checkedRunSpread == true) {
  //         countTeam = countTeam + 1;
  //       }
  //       if (elements.checkedTotal == true) {
  //         countTeam = countTeam + 1;
  //       }
  //       if (elements.checkedMoneyline == true) {
  //         countTeam = countTeam + 1;
  //       }
  //     });
  //     if (countTeam <= this.gameSelectLength) {
  //       resolve(true);
  //     } else {
  //       resolve(false);
  //     }
  //   })
  // }

  async onChangeRunspread(event: any, item: any, index: any, matchIndex: any, type: any, checkedType: any) {
    var checked;
    checked = event.target.checked;
    const elementId = event.target.id;
    var oppTeam;    
    if(matchIndex == 0){
      oppTeam = this.newDataCollection.details.teams[index].match[1].team_name;
    }else if(matchIndex == 1){
      oppTeam =  this.newDataCollection.details.teams[index].match[0].team_name;
    }
    if(checked){
      this.newDataCollection.details.teams[index].match[matchIndex][checkedType] = true;
      if (matchIndex == 0 && this.newDataCollection.details.teams[index].match[1][checkedType] == true) {
        this.newDataCollection.details.teams[index].match[1][checkedType] = false;
        await this.add(item, type, index, matchIndex, 'update',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
        return
      } else if (matchIndex == 1 && this.newDataCollection.details.teams[index].match[0][checkedType] == true) {
        this.newDataCollection.details.teams[index].match[0][checkedType] = false;
        await this.add(item, type, index, matchIndex, 'update',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
        return
      }
      if (this.teamsCheck < 5) {
        this.teamsCheck = this.teamsCheck + 1;
        this.add(item, type, index, matchIndex, 'add',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
      }else {
        const myElement = document.getElementById(elementId) as HTMLInputElement;
        myElement.checked = false;
        this.newDataCollection.details.teams[index].match[matchIndex][checkedType] = false;
        this.toastr.error(this.status.MAXIMUM_BRAWLS_SELECT.name);
      }
    } else {
      this.newDataCollection.details.teams[index].match[matchIndex][checkedType] = false;
      this.teamsCheck = this.teamsCheck - 1;
      this.add(item, type, index, matchIndex, 'remove',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
    }
    // var oppTeam;    
    // if(matchIndex == 0){
    //   oppTeam = this.newDataCollection.details[index].match[1].team_name;
    // }else if(matchIndex == 1){
    //   oppTeam =  this.newDataCollection.details[index].match[0].team_name;
    // }
    // // const elementId = event.target.id
    // if (event.target.checked) {
    //   this.newDataCollection.details[index].match[matchIndex][checkedType] = true;
    //   if (matchIndex == 0 && this.newDataCollection.details[index].match[1][checkedType] == true) {
    //     this.newDataCollection.details[index].match[1][checkedType] = false;
    //     await this.add(item, type, index, matchIndex, 'update',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
    //     return
    //   } else if (matchIndex == 1 && this.newDataCollection.details[index].match[0][checkedType] == true) {
    //     this.newDataCollection.details[index].match[0][checkedType] = false;
    //     await this.add(item, type, index, matchIndex, 'update',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
    //     return
    //   }
    //   if (this.teamsCheck < 5) {
    //     this.teamsCheck = this.teamsCheck + 1;
    //     this.add(item, type, index, matchIndex, 'add',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
    //   } else {
    //     const myElement = document.getElementById(elementId) as HTMLInputElement;
    //     myElement.checked = false;
    //     this.newDataCollection.details[index].match[matchIndex][checkedType] = false;
    //     this.toastr.clear();
    //     this.toastr.error(this.status.MAXIMUM_BRAWLS_SELECT.name);
    //   }
    // } else {
    //   this.newDataCollection.details[index].match[matchIndex][checkedType] = false;
    //   this.teamsCheck = this.teamsCheck - 1;
    //   this.add(item, type, index, matchIndex, 'remove',oppTeam,this.newDataCollection.potential,this.newDataCollection.isbadges);
    // }

  }


  add(data: any, type: any, index: any, subIndex: any, position: any,oppTeamName:any,potential:any,badges:any) {
    var point: any;
    var value: any;
    var match_Id:any;
    data.list.forEach((element: any) => {      
      if(type == element.key){
        point = element.point;
        value = element.value;        
        match_Id = element._id
      }
    });
    var object = {
      data: data,
      position: position,
      type: type,
      index: index,
      subIndex: subIndex,
      oppTeamName:oppTeamName,
      potentialAmount:potential,
      isbadges:badges,
      value: value,
      point: point,
      match_Id: match_Id,
      key: 'team'
    };    
    this.gameData.emit(object);
    this.teamCount.emit(this.teamsCheck);
    this.gameDataNew.emit(this.newDataCollection);
  }

  removeSelectedData(data: any,newData:any) {
    // this.teamsCheck = this.teamsCheck - 1;
    this.teamCount.emit(this.teamsCheck);
    this.newDataCollection = newData;
    if(data.type == 'runspread'){            
      this.newDataCollection.details.teams[data.index].match[data.subIndex].checkedRunSpread = false;
    } else if(data.type == 'total'){
      this.newDataCollection.details.teams[data.index].match[data.subIndex].checkedTotal = false;
    } else if(data.type == 'moneyline'){
      this.newDataCollection.details.teams[data.index].match[data.subIndex].checkedMoneyline = false;
    }
    this.gameDataNew.emit(this.newDataCollection);
  }

  clearSelectedData(data:any){
    this.teamsCheck = 0;
    this.teamCount.emit(this.teamsCheck);
    this.newDataCollection = data;    
    this.newDataCollection.details.teams.forEach(async(element:any,i:any) => {
      await element.match.forEach((elementMatch:any,index:any) => {
        if(elementMatch.checkedRunSpread){
          this.newDataCollection.details.teams[i].match[index].checkedRunSpread = false;
        }
        if(elementMatch.checkedTotal){
          this.newDataCollection.details.teams[i].match[index].checkedTotal = false;
        }
        if(elementMatch.checkedMoneyline){
          this.newDataCollection.details.teams[i].match[index].checkedMoneyline = false;
        }
      });
    });
    this.gameDataNew.emit(this.newDataCollection);
    
  }

  getNUmberData(data: any): any{
    if(data > 0){
      return '+'+data
    } else{
      return data
    }
  }


}
