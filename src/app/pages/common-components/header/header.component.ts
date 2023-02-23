import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import io from 'socket.io-client';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/constant';
import { ApiService } from 'src/app/service/api.service';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  socket: any;
  buddyBucks: any;
  profilePic: any;
  status: any = Status;
  activeModal: any;
  notificationCount: any = 0;
  notificationPage: any = 0;
  notificationPageDefult: any = 1;
  notificationList: any;
  notificationAll: any = [];
  noData: any = false;
  dropdown: any = false;
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild(PerfectScrollbarDirective)
  directiveRef?: PerfectScrollbarDirective;
  @ViewChild('drop1', { static: false }) mydrop: NgbDropdown;

  constructor(
    private storageService: LocalstorageService,
    private _apiService: ApiService,
    private spinner: NgxSpinnerService,
    private _router: Router
  ) { }
  collapsed = true;

  ngOnInit(): void {
    this.socket = io(
      environment.socket +
      this.status.AUTHORIZATION.name +
      this.storageService.getItem('_jwt'),
      {}
    );
    this.socket.emit('emitUserInfo', (data: any) => {
      data.subscribe((data1: string) => { });
    });
    this.socket.on('onUserInfo', (data: any) => {
      this.buddyBucks = data.BuddyBucks;
    });
    this.socket.emit('emitUserUnread', (data: any) => {
      data.subscribe((data1: string) => { });
    });
    this.socket.on('onUserUnread', (data: any) => {
      this.notificationCount = data.unread_count;
    });
    var pic: any = JSON.parse(this.storageService.getItem('userInfo'));
    if (pic['profileImage']) {
      this.profilePic = pic['profileImage'];
    } else {
      this.profilePic = 'assets/images/profile-icon.svg';
    }
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  loadNotification() {
    this.notificationList.forEach((element: any) => {
      this.notificationAll.push(element);
    });
    if (this.notificationAll.length == 0) {
      this.noData = true;
    }
    // this.mydrop.open();
    this.spinner.hide();
  }

  getNotification(page: any) {
    // this.spinner.show();
    this._apiService.getPrivate('account/get-notification/' + page).subscribe({
      next: async (data) => {
        if (data.code === 200) {
          if (data?.data) {
            this.notificationList = data?.data?.data;
            this.notificationPage = data?.data.total;
            this.loadNotification();
          }
        } else {
          // this.spinner.hide();
        }
      },
      error: (err) => {
        // this.spinner.hide();
      },
    });
  }

  dateDifference(date2: any, date1: any) {
    var getTimeDifference;
    var displayDate;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );

    const utc2 = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    if (Math.floor((utc2 - utc1) / _MS_PER_DAY) == 0) {
      getTimeDifference = Math.abs(date2.getTime() - date1.getTime());
      var timeDiffInSecond = Math.ceil(getTimeDifference / 1000); // in second
      var newTimeData = Math.ceil(timeDiffInSecond / 3600)
      if (newTimeData > 60) {
        displayDate = Math.trunc(newTimeData / 60) + 'hour ago';
      } else {
        displayDate = Math.ceil(timeDiffInSecond / 60); + 'min ago'
      }
    } else {
      displayDate = Math.floor((utc2 - utc1) / _MS_PER_DAY)
    }
    console.log(displayDate, "display DATE");

    return displayDate;
  }

  // getTime(date: any): any {
  //   // console.log(new Date(date),"date");
  //   // console.log(new Date(),"current date");


  //   var dt = this.dateDifference(new Date(), new Date(date));
  //   // console.log(dt,"dt");

  //   if (dt === 0) {
  //     return `${''}`;
  //   } else {
  //     return ` - ${dt} days ago`;
  //   }
  // }

  getTime(date: any) {
    if (typeof date !== 'object') {
      date = new Date(date);
    }
    let now: any = new Date();
    var seconds = Math.floor((now - date) / 1000);
    var intervalType;
    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
      if (interval > 1) {
        intervalType = 'years';
      } else {
        intervalType = 'year';
      }
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        if (interval > 1) {
          intervalType = 'months';
        } else {
          intervalType = 'month';
        }
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          if (interval > 1) {
            intervalType = 'days';
          } else {
            intervalType = 'day'
          }
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hours";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              if (interval > 1) {
                intervalType = "minutes";
              } else {
                intervalType = "minute";
              }
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }
    if (interval > 1 || interval === 0) {
      intervalType += '';
    }
    return interval + ' ' + intervalType + ' ago';
  }

  onClick() {
    this.notificationList = this.notificationList.concat(this.notificationList);
  }

  onScrollDown() {
    if (this.notificationPageDefult == this.notificationPage) {
      return;
    }

    if (this.notificationPageDefult < this.notificationPage) {
      this.notificationPageDefult = this.notificationPageDefult + 1;
      this.getNotification(this.notificationPageDefult);
    }
  }

  notification(data: any) {
    this.notificationAll = [];
    this.notificationPage = 0;
    // this.mydrop.close();
    this.getNotification(data);
  }

  redirect(data: any) {
    if (data?.type == 'invite_buddy') {
      this._router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() =>
          this._router.navigate(['/brawls-details/' + data?.brawlId])
        );
    }
    // if(data?.type == 'winning_badge'){
    //   this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    //   this._router.navigate(['/my-brawls/'+data?.brawlId]));
    // }
    // if(data?.type == 'add_buddy'){
    //   this._router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    //   this._router.navigate(['/leaderboard/'+data?.buddyId]));
    // }
    else {
      return;
    }
  }

  ngOnDestroy() {
    this.socket?.disconnect();
  }
}
