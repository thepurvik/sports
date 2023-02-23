import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { TimeFormat } from 'src/app/service/validation/timeformat';

@Component({
  selector: 'app-my-brawls',
  templateUrl: './my-brawls.component.html',
  styleUrls: ['./my-brawls.component.css']
})
export class MybrawlsComponent implements OnInit {
  leagueInfo: any = [];
  activeLeagueData = 'NFL';
  disabled = false;
  joinBrawlList: any;
  id: any;
  pgaLeague:any;
  constructor(
    private listClass: ClassList,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrServiceProvider,
    private timeFormat: TimeFormat,
    private route: ActivatedRoute

  ) {
    this.listClass.add('app-my-brawls');
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id')
    }
  }
  active = 1;

  ngOnInit(): void {

    this.leagueInfo = [
      {
        icon: 'assets/images/NFL.svg',
        hoverIcon: 'assets/images/NFL-HOVER.svg',
        name: 'NFL'
      },
      {
        icon: 'assets/images/MLB.svg',
        hoverIcon: 'assets/images/MLB-HOVER.svg',
        name: 'MLB'
      },
      {
        icon: 'assets/images/NFL.svg',
        hoverIcon: 'assets/images/NFL-HOVER.svg',
        name: 'CFB'
      },
      {
        icon: 'assets/images/CBB.svg',
        hoverIcon: 'assets/images/CBB-HOVER.svg',
        name: 'CBB'
      },
      {
        icon: 'assets/images/NHL.svg',
        hoverIcon: 'assets/images/NHL-HOVER.svg',
        name: 'NHL'
      },
      {
        icon: 'assets/images/PGA.svg',
        hoverIcon: 'assets/images/PGA-HOVER.svg',
        name: 'PGA'
      },
      {
        icon: 'assets/images/CBB.svg',
        hoverIcon: 'assets/images/CBB-HOVER.svg',
        name: 'NBA'
      }
    ]

    this.getBrawlList();

  }

  sortToggle(event: any) {
    this.activeLeagueData = event;
  }

  getBrawlList() {
    this.spinner.show();
    this.api.getPrivateTime('brawls/get-brawl-selection/' + this.id).subscribe({
      next: data => {
        if (data.code === 200) {
          this.joinBrawlList = data.data;
          this.pgaLeague =  this.joinBrawlList;
          this.id = this.joinBrawlList.brawlsId;
          this.spinner.hide();
        }
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

  transformDate(data: any) {
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix
  }

  ngOnDestroy() {
    this.listClass.destroy('app-my-brawls');
  }

  create_brawl() {
    this._router.navigateByUrl('/create-brawl')
  }

  getTeamName(name: any, selection: any, playerName: any): any {
    if (selection == 'under' || selection == 'over') {
      return playerName;
    } else {
      var teamName = ''
      teamName = name.join(", ");
      return teamName;
    }
  }

  getSelection(selectedName: any) {
    var selectName;
    if (selectedName.selection === 'runspread') {
      selectName = 'spread'
    } else {
      selectName = selectedName.selection;
    }

    if(selectedName.type == 1){
      selectName = selectName + ' (' + selectedName.options + ')';      
    }    
    
    return selectName;
  }
  
  winStyle(type: any, win: any, selection: any): any{
    if(type == 0){
      if(win == ''){
        return 'rubik-bold font-weight-500 ml-1';
      } else if(win == '0'){
        return 'rubik-bold font-weight-500 ml-1 scores-color-loss';
      } else if(win == '1'){
        return 'rubik-bold font-weight-500 ml-1 scores-color-win';
      }
    } else if (type == 1){
      if(win != ''){
        if(win == selection){
          return 'rubik-bold font-weight-500 ml-1 scores-color-win';
        } else if(win != selection){
          return 'rubik-bold font-weight-500 ml-1 scores-color-loss';
        }
      } else {
        return 'rubik-bold font-weight-500 ml-1';
      }
    }
  }


  convertScore(data:any){
    data = data.map((a:any) => Number(a).toFixed(0));    
    var teamScore = ''
    teamScore = data.join(" - ");
    return teamScore
  }


  team1ScoreStyle(data: any): any{
    var team1_score = Number(data[0]);
    var team2_score = Number(data[1]);   
    if(team1_score > team2_score){      
      return 'score-color-win'
    } else if(team1_score < team2_score){
      return 'score-color-loss'
    } else {
      return 'score-color-defult'
    }
  }

  team2ScoreStyle(data: any): any{
    var team1_score = Number(data[0]);
    var team2_score = Number(data[1]);
    if(team2_score > team1_score){      
      return 'score-color-win'
    } else if(team2_score < team1_score){
      return 'score-color-loss'
    } else {
      return 'score-color-defult'
    }
  }
}
