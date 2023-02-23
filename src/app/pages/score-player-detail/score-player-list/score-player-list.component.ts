import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassList } from '../../../service/validation/classList'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AddBuddyComponent } from '../../common-components/add-buddy/add-buddy.component'
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DatePipe } from '@angular/common';
import { ToastrServiceProvider } from '../../../service/validation/toaster'
import * as moment from 'moment';
import {map, Subscription, timer} from 'rxjs';  
import { Router,ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-score-player-list',
  templateUrl: './score-player-list.component.html',
  styleUrls: ['./score-player-list.component.css']
})
export class ScorePlayerListComponent implements OnInit {
  scoreData: any;
  tempData: any = [];
  leagueName:any;
  gameId:any;
  activeClassTeam1: boolean = true;    
  activeClassTeam2:boolean = false;  
  teamList:any = [] 
  quaterTime:any;
  otherInfo:any;
  win:boolean = true;
  loss:boolean = false;
  constructor(private listClass: ClassList,
    private modalService: NgbModal,
    private api : ApiService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrServiceProvider,
    private activatedRoute:ActivatedRoute,
    private route:Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.leagueName = params.get('id');
      this.gameId = params.get('id1');
    });
    this.getScore();
  }
  getScore(){
    this.spinner.show();
    this.api.getPrivatWithData('score/get-live-player-score/' ,this.leagueName + '/' +  this.gameId).subscribe({
      next: res => {     
        this.spinner.hide();
        if(res.code === 200){             
          this.scoreData = res.data;  
          this.teamList = this.scoreData.team1_players;
          this.quaterTime = this.scoreData.quarter_time;
          this.otherInfo = this.scoreData.other_info;
          if(this.scoreData.team1_score > this.scoreData.team2_score){
            this.win = true;
            this.loss = false;
          } else{
            this.win = false;
            this.loss = true;
          }
        };
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }
  
  getTeam2Data(data:any){
    this.activeClassTeam2 = true;
    this.activeClassTeam1 = false;
    this.teamList = data.team2_players;
    if(this.scoreData.team1_score > this.scoreData.team2_score){
      this.win = true;
      this.loss = false;
    } else{
      this.win = false;
      this.loss = true;
    }
  }
  getTeam1Data(data:any){
    this.activeClassTeam1 = true;
    this.activeClassTeam2 = false;
    this.teamList = data.team1_players;
    if(this.scoreData.team1_score > this.scoreData.team2_score){
      this.win = true;
      this.loss = false;
    } else{
      this.win = false;
      this.loss = true;
    }
  }
}
