import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/service/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-advertising-dialog-box',
  templateUrl: './advertising-dialog-box.component.html',
  styleUrls: ['./advertising-dialog-box.component.css'],
})
export class AdvertisingDialogBoxComponent implements OnInit {
  display: any;
  closeButton: boolean = false;
  advList: any;
  showMe: boolean = true;
  advData: any;
  dateTime: any;
  advTime: any;
  advType: any;
  intervalId: number = 0;
  seconds: number = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private _apiService: ApiService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getAdvertismentList();
  }

  getAdvertismentList() {
    this._apiService
      .getPrivate('account/get-advertisement-list')
      .subscribe((res) => {
        this.advList = res.data.url;
        this.advData = res.data._id;
        this.advTime = res.data.time_interval;
        this.advType = res.data.type;
        this.timer(1);
      });
  }

  countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }

  stop(): void {
    this.clearTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  clearTimer(): void {
    clearInterval(this.intervalId);
  }

  timer(minute: any) {
    // let minute = 1;
    this.countDown();
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: any = this.advTime;

    const prefix = minute < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      // else statSec = this.advTime;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${textSec}`;
      if (statSec == 0) {
        // this.activeModal.close();
        clearInterval(timer);
        this.closeButton = true;
        this.showMe = true;
      }
    }, 1000);
  }
  currentTime: number;
  onTimeUpdate(value: any, type: any) {
    if (type == 'video') {
      this.currentTime = value.target.currentTime;
    } else {
      this.currentTime = this.seconds;
    }
  }
  close(type: string) {
    this.stop();

    if (this.closeButton) {
      if (this.advType == 'video/mp4' || this.advType == 'video/mov') {
        if (type == 'skipAd') {
          var obj = {
            advId: this.advData,
            watching_time: this.currentTime,
            isskip: 1,
          };
        } else {
          var obj = {
            advId: this.advData,
            watching_time: this.currentTime,
            isskip: 0,
          };
        }
      } else {
        if (type == 'skipAd') {
          var obj = {
            advId: this.advData,
            watching_time: this.seconds,
            isskip: 1,
          };
        } else {
          var obj = {
            advId: this.advData,
            watching_time: this.seconds,
            isskip: 0,
          };
        }
      }

      this._apiService
        .postPrivate('account/add-adv-tracking', obj)
        .subscribe((res) => {});
      this.activeModal.close();
    }
  }
  videoEnd() {
    this.showMe = false;
  }
}
