import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassList } from '../../service/validation/classList';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddBuddyComponent } from '../common-components/add-buddy/add-buddy.component';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { ToastrServiceProvider } from '../../service/validation/toaster';
import * as moment from 'moment';
import { map, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
})
export class ScoreComponent implements OnInit {
  scoreInfo: any = [];
  timerSubscription: Subscription;
  page = 1;
  activeModal: any;
  collectionSize: any = 0;
  todayDate: any = new Date();
  yesterdayDate: any = new Date();
  yesterdayDay: any = new Date();
  dayBeforeYesterdayDate: any = new Date();
  dayBeforeYesterdayDay: any = new Date();
  twoDayBeforeYesterdayDate: any = new Date();
  twoDayBeforeYesterdayDay: any = new Date();
  tomorrowDate: any = new Date();
  tomorrowDay: any = new Date();
  dayAftertomorrowDate: any = new Date();
  dayAftertomorrowDay: any = new Date();
  twoDayAftertomorrowDate: any = new Date();
  twoDayAftertomorrowDay: any = new Date();
  searchData: any;
  activeLeagueData: any;
  leagueNameArray: any = [];
  scoreData: any;
  tempData: any = [];
  loadScore: any = [];
  todayMatchId: any = [];
  constructor(
    private listClass: ClassList,
    private modalService: NgbModal,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrServiceProvider,
    private datePipe: DatePipe
  ) {
    this.listClass.add('app-brawls');
  }
  active = 4;
  playerData: any;
  closeResult = '';
  pageSize = 10;
  leagueInfo: any = [];

  ngOnInit(): void {
    this.getScore();
    this.leagueInfo = [
      {
        icon: 'assets/images/NFL.svg',
        hoverIcon: 'assets/images/NFL-HOVER.svg',
        name: 'NFL',
      },
      {
        icon: 'assets/images/MLB.svg',
        hoverIcon: 'assets/images/MLB-HOVER.svg',
        name: 'MLB',
      },
      {
        icon: 'assets/images/NFL.svg',
        hoverIcon: 'assets/images/NFL-HOVER.svg',
        name: 'CFB',
      },
      {
        icon: 'assets/images/CBB.svg',
        hoverIcon: 'assets/images/CBB-HOVER.svg',
        name: 'CBB',
      },
      {
        icon: 'assets/images/NHL.svg',
        hoverIcon: 'assets/images/NHL-HOVER.svg',
        name: 'NHL',
      },
      {
        icon: 'assets/images/CBB.svg',
        hoverIcon: 'assets/images/CBB-HOVER.svg',
        name: 'NBA',
      },
    ];
    var yesterday = this.yesterdayDate.setDate(
      this.yesterdayDate.getDate() - 1
    );
    this.yesterdayDate = this.getDateTransform(yesterday);
    this.yesterdayDay = this.getDayFromDate(yesterday);

    var twoDayBeforeYesterday = this.twoDayBeforeYesterdayDate.setDate(
      this.twoDayBeforeYesterdayDate.getDate() - 3
    );
    this.twoDayBeforeYesterdayDate = this.getDateTransform(
      twoDayBeforeYesterday
    );
    this.twoDayBeforeYesterdayDay = this.getDayFromDate(twoDayBeforeYesterday);

    var dayBeforeYesterday = this.dayBeforeYesterdayDate.setDate(
      this.dayBeforeYesterdayDate.getDate() - 2
    );
    this.dayBeforeYesterdayDate = this.getDateTransform(dayBeforeYesterday);
    this.dayBeforeYesterdayDay = this.getDayFromDate(dayBeforeYesterday);

    this.todayDate = this.datePipe.transform(this.todayDate, 'd MMM');

    var tomorrow = this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    this.tomorrowDate = this.getDateTransform(tomorrow);
    this.tomorrowDay = this.getDayFromDate(tomorrow);

    var dayAfterTomorrow = this.dayAftertomorrowDate.setDate(
      this.dayAftertomorrowDate.getDate() + 2
    );
    this.dayAftertomorrowDate = this.getDateTransform(dayAfterTomorrow);
    this.dayAftertomorrowDay = this.getDayFromDate(dayAfterTomorrow);

    var twoDayAfterTomorrow = this.twoDayAftertomorrowDate.setDate(
      this.twoDayAftertomorrowDate.getDate() + 3
    );
    this.twoDayAftertomorrowDate = this.getDateTransform(twoDayAfterTomorrow);
    this.twoDayAftertomorrowDay = this.getDayFromDate(twoDayAfterTomorrow);
    setTimeout(() => {
      this.timerSubscription = timer(0, 1000 * 60)
        .pipe(
          map(() => {
            this.active === 4 ? this.refresh() : false;
          })
        )
        .subscribe();
    }, 1000 * 10);
  }

  openLeaderBoardModel(playerData: any) {
    this.playerData = playerData;
    this.activeModal = this.modalService.open(AddBuddyComponent, {
      centered: true,
    });
    this.activeModal.componentInstance.playerData = this.playerData;
    this.activeModal.result.then(
      (close: any) => {},
      (data: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(data)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getDateTransform(data: any) {
    var date;
    date = this.datePipe.transform(data, 'd MMM');
    return date;
  }

  getDayFromDate(data: any) {
    var day;
    day = this.datePipe.transform(data, 'EEE');
    return day;
  }

  searchFunction() {}

  getScore() {
    this.spinner.show();
    this.api.getPrivateTime('score/all-users-scoreboard').subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.code === 200) {
          this.scoreData = data.data;
          this.setDataGameType(data.data);
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  setDataGameType(data: any) {
    data.forEach(async (element: any) => {
      this.leagueNameArray.push(element.league);
    });
    this.activeLeagueData = this.leagueNameArray[0];
    this.setFilters();
  }

  setFilters() {
    this.scoreData.map((p: any) => {
      if (p.league == this.activeLeagueData) {
        this.tempData = p.data;
        this.setChildData(this.todayDate);
      }
    });
  }

  async setChildData(date: any) {
    this.searchData = '';
    var dt: any = new Date().getUTCFullYear();
    var entireDate: any = moment(date, 'D MMM').format(dt + '-MM-DD');
    let index = this.tempData.findIndex((x: any) => x.date == entireDate);
    this.loadScore = index === -1 ? [] : this.tempData[index].match;
    this.todayMatchId =
      this.loadScore == []
        ? []
        : this.active == 4
        ? this.loadScore.map((data: any) => data.gameId)
        : [];
  }

  sortToggle(event: any) {
    this.loadScore = [];
    this.activeLeagueData = event;
    this.setFilters();
    if (this.active == 1) {
      this.setChildData(this.twoDayBeforeYesterdayDate);
    } else if (this.active == 2) {
      this.setChildData(this.dayBeforeYesterdayDate);
    } else if (this.active == 3) {
      this.setChildData(this.yesterdayDate);
    } else if (this.active == 4) {
      this.setChildData(this.todayDate);
    } else if (this.active == 5) {
      this.setChildData(this.tomorrowDate);
    } else if (this.active == 6) {
      this.setChildData(this.dayAftertomorrowDate);
    } else if (this.active == 7) {
      this.setChildData(this.twoDayAftertomorrowDate);
    }
  }

  async refresh() {
    var d = new Date();
    d.setDate(d.getDate());
    var date = this.datePipe.transform(d, 'yyyy-MM-dd');
    this.getRefreshData(date).then((data: any) => {
      data.code === 200
        ? data.data != []
          ? (this.loadScore = data.data)
          : false
        : false;
    });
  }

  getRefreshData(date: any) {
    let tempData: any = {
      league: this.activeLeagueData,
      gameId: this.todayMatchId,
    };
    const params = new Promise((resolve, reject) => {
      this.api
        .PostPrivateTime('score/get-live-scoreboard', tempData)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            // this.toastr.error(err.error.error);
          },
        });
    });
    return params;
  }
}
