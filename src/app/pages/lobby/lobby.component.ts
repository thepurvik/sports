import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/service/api.service';
import { Status } from 'src/app/constant';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { HeaderSet } from 'src/app/service/header.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  league: any = [];
  leagueInfo: any = [];
  contestInfo: any = [];
  howItWorksData: any = [];
  video: any;
  activeLeagueData: any;
  seeMoreBt: any = true;
  brawlData: any;
  leagueNameArray: any = [];
  status: any = Status;
  page: any = 1;
  limit: any = 12;
  loadAllData: any = [];
  previewData: any;
  defultPage: any = 1;
  count: any;
  constructor(
    private listClass: ClassList,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private _apiService: ApiService,
    public toastr: ToastrServiceProvider,
    public headerSet: HeaderSet,
  ) {
    this.listClass.add('app-lobby');
    this.headerSet.headerWithTime();
  }
  active = 1;

  ngOnInit(): void {
    this.video = document.querySelector("#vid");
    const videoPlay = document.getElementsByClassName('video-container-custom')[0];
    videoPlay.classList.add('video-pause');
    this.league = [
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
        icon: 'assets/images/CBB.svg',
        hoverIcon: 'assets/images/CBB-HOVER.svg',
        name: 'NBA'
      },
      {
        icon: 'assets/images/PGA.svg',
        hoverIcon: 'assets/images/PGA-HOVER.svg',
        name: 'PGA'
      },
    ]

    this.contestInfo = [
      {
        id: 1,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'NFL'
      },
      {
        id: 2,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'MLB'
      },
      {
        id: 3,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'yes',
        league: 'CFB'
      },
      {
        id: 4,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'CBB'
      },
      {
        id: 5,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'NHL'
      },
      {
        id: 6,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'PGA'
      },
      {
        id: 7,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'NBA'
      },
      {
        id: 8,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'NFL'
      },
      {
        id: 9,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'MLB'
      },
      {
        id: 10,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'yes',
        league: 'CFB'
      },
      {
        id: 11,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'CBB'
      },
      {
        id: 12,
        name: '$3.5M NFL sunday Million',
        icon: 'assets/images/NFL.svg',
        date: 'SEP 8, 1:00PM ET (MAIN)',
        totalEntry: 462963,
        doneEntry: 55517,
        entryFees: 10000,
        isFeatured: 'no',
        league: 'NHL'
      }
    ]

    this.howItWorksData = [
      {
        id: 1,
        question: '1. Create or Join a Brawl',
        answer: 'Challenge Your Buddies Or Compete Against Players From Around The Country'
      },
      {
        id: 2,
        question: '2. Select 5 bets to complete your Card',
        answer: 'Fill Your Card With Any Combination Of Real Bets – Side, Money Line, Total Or Player Props'
      },
      {
        id: 3,
        question: '3. Wager $10,000 Buddy Bucks across your 5 bets',
        answer: 'Allocate Your Buddy Bucks To Maximize Your Score'
      },
      {
        id: 4,
        question: '4. Win Buddy Bucks, Belts, and bragging rights',
        answer: 'Beat Your Buddies And Accumulate Buddy Bucks All Year'
      }
    ]

    this.callApi('get-all-brawls-list');
  }

  // loadData(){
  //   this.brawlData.forEach((element:any) => {
  //       this.loadAllData.push(element)
  //   });    
  //   if(this.page == this.count){      
  //     this.seeMoreBt = false;
  //   }
  //   this.getFilterData(this.brawlData);
  // }

  callApi(data: any) {
    if (data == this.previewData) {
      this.previewData = data;
    } else {
      this.seeMoreBt = true;
      this.page = this.defultPage;
      this.previewData = data;
      this.loadAllData = []
    }
    this.spinner.show();
    this.leagueNameArray = []
    let obj = {
      "page": this.page
    };

    this._apiService.getPrivateTime('brawls/' + data).subscribe({
      next: async data => {
        if (data.code === 200) {
          if (data?.data) {
            this.brawlData = data?.data;
            this.count = data.data.count;
            if (data.data != '') {
              // this.loadData(); 
              this.getFilterData(this.brawlData);
            } else {
              this.leagueNameArray = []
            }
          } else {
            this.brawlData = [];
          }
          this.spinner.hide();
        }
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

  create_brawl() {
    this._router.navigateByUrl('/create-brawl')
  }

  getFilterData(data: any) {
    this.leagueInfo = [];
    this.brawlData.forEach((element: any) => {
      if (this.leagueNameArray.find((ob: any) => ob === element.league) === undefined) {
        this.leagueNameArray.push(element.league);
      }
      this.league.forEach((data: any) => {
        if (data.name == element.league) {
          this.leagueInfo.push(data);
        }
      });
    });
    this.leagueInfo = this.leagueInfo.filter(function (elem: any, index: any, self: any) {
      return index === self.indexOf(elem);
    });
    if (this.leagueNameArray.length > 0) {
      this.activeLeagueData = this.leagueNameArray[0];
    }
  }

  playVideo() {
    this.video.play();
    const videoPlay = document.getElementsByClassName('video-container-custom')[0];
    videoPlay.classList.remove('video-pause');
    videoPlay.classList.add('video-play');
  }
  pauseVideo() {
    this.video.pause();
    this.videoEnd();
  }

  videoEnd() {
    const videoPlay = document.getElementsByClassName('video-container-custom')[0];
    videoPlay.classList.add('video-pause');
    videoPlay.classList.remove('video-play');
  }

  sortToggle(event: any) {
    this.activeLeagueData = event;

  }

  ngOnDestroy() {
    this.listClass.destroy('app-lobby');
  }

  seeMore(data: any) {
    if (data == this.previewData) {
      this.page = this.page + this.defultPage;
      this.previewData = data;
      this.callApi(data);
    } else {
      this.page = this.defultPage;
      this.previewData = data;
      this.loadAllData = []
      this.callApi(data);
    }

  }
}
