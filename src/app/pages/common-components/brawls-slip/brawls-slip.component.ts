import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrawlsDetailsComponent } from '../../brawls-details/brawls-details.component';
import { ToastrServiceProvider } from '../../../service/validation/toaster'
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Status } from 'src/app/constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisingDialogBoxComponent } from '../advertising-dialog-box/advertising-dialog-box.component';
@Component({
  selector: 'app-brawls-slip',
  templateUrl: './brawls-slip.component.html',
  styleUrls: ['./brawls-slip.component.css']
})
export class BrawlsSlipComponent implements OnInit {
  @Input() selectedGameData: any;
  @Output() removeData = new EventEmitter();
  selectGameListData: any = [];
  totalWager: any = 0;
  gameSelectLength = 4;
  gameSelectWager = 10000;
  wagerValue: any;
  total: any = 0;
  toWinList: any = [];
  win: any;
  wager: any;
  toWin: any = 0;
  potential: any = 0;
  potentialSend: any = 0;
  object: any = [];
  objCollection: any;
  brawlId: any;
  badge: any;
  status: any = Status;
  potentialAmt: any;
  fixWager: any = 10000;
  activeModal:any;
  constructor(
    private brawlsDetailsComponent: BrawlsDetailsComponent,
    public toastr: ToastrServiceProvider,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }


  async load(data: any) {
    if (data.key == 'team') {
      this.potential = data.potentialAmount;
    }
    if (data.position == 'add') {
      if (this.selectGameListData.length <= this.gameSelectLength) {
        await this.selectGameListData.push(data);
        this.selectGameListData.forEach((element: any, i: any) => {
          if (!element) {
            this.selectGameListData.splice(i, 1)
          }
        });
      } else {
        this.toastr.error(this.status.MAXIMUM_BRAWLS_SELECT.name);
      }
    }
    if (data.position == 'remove') {
      await this.selectGameListData.forEach(async (element: any, i: any) => {
        if (element.index === data.index && element.type === data.type) {
          this.selectGameListData.splice(i, 1);
          this.toWinList.splice(i, 1);
          await this.loadToWin();
        }
      });
    }
    if (data.position == 'update') {
      await this.selectGameListData.forEach((element: any, i: any) => {
        if (element.index === data.index && element.type === data.type) {
          this.selectGameListData.splice(i, 1, data);
          this.toWinList.splice(i, 1);
          this.loadToWin();
        }
      });
    }
    this.brawlId = data.brawlId
    this.badge = data.isbadges;
  }

  async loadData(data: any) {
    await this.load(data);
  }

  async clearTeamAll() {
    this.selectGameListData = [];
    this.toWinList = [];
    await this.loadToWin();
  }


  clearTeam(i: any, removeData: any) {
    this.selectGameListData.splice(i, 1);
    this.toWinList.splice(i, 1);
    this.loadToWin();
    this.removeData.emit(removeData);
  }



  async wagerLogic(event: any, index: any) {
    var value = event.target.value;
    var teamData = this.selectGameListData[index];
    var typeTeam;
    if (await this.selectGameListData[index].key == 'player') {
      typeTeam = this.selectGameListData[index].selection;
    } else {
      typeTeam = this.selectGameListData[index].type;

    }
    var countValue;
    if (await typeTeam == 'runspread') {
      if (0 > Number(teamData.value)) {
        countValue = (-100 / Number(teamData.value)) * (Number(value)) + Number(value);
      } else {
        countValue = (Number(teamData.value) / 100) * (Number(value)) + Number(value);
      }
    }

    if (await typeTeam == 'total') {
      if (0 > Number(teamData.value)) {
        countValue = (-100 / Number(teamData.value)) * (Number(value)) + Number(value);
      } else {
        countValue = (Number(teamData.value) / 100) * (Number(value)) + Number(value);
      }
    }

    if (await typeTeam == 'moneyline') {
      if (0 > Number(teamData.point)) {    
        countValue = (-100 / Number(teamData.point)) * (Number(value)) + Number(value);
      } else {
        countValue = (Number(teamData.point) / 100) * (Number(value)) + Number(value);
      }
    }
    if (await this.selectGameListData[index].key == 'player') {
      countValue = (-100 / Number(-110)) * (Number(value)) + Number(value);
    }
    this.win = {
      'wager': Number(value),
      'selection': typeTeam,
      'matchId': teamData.match_Id,
      'winAmount': countValue.toFixed(2)
    }
    this.toWinList[index] = this.win;
    this.loadToWin();
  }

  async loadToWin() {
    if (this.selectGameListData.length == 0) {
      this.brawlsDetailsComponent.wagerTotal = 0;
      this.brawlsDetailsComponent.toWinTotal = 0;
      this.brawlsDetailsComponent.potential = 0;
    } else {
      this.toWin = 0;
      this.total = 0;
      await this.toWinList.forEach((element: any) => {
        this.toWin = this.toWin + Number(element.winAmount);
        this.total = this.total + Number(element.wager);
      });
      this.brawlsDetailsComponent.wagerTotal = this.total.toFixed(2);
      this.brawlsDetailsComponent.toWinTotal = this.toWin.toFixed(2);
      this.brawlsDetailsComponent.potential = (this.toWin + this.total).toFixed(2);
      this.potentialAmt = this.brawlsDetailsComponent.potential;
      this.brawlsDetailsComponent.selectedCardLength = this.selectGameListData.length;
    }

  }

  checkSlipWager() {
    return new Promise(async (resolve, reject) => {
      if (this.toWinList) {
        for await (const element of this.toWinList) {
          if (element?.wager < 200) {
            this.toastr.error(this.status.MAXIMUM_200_ENTER.name);
            resolve(true);
            return;
          }
        }
        resolve(false);
      }
    });
  }


  async submitBrawlTicket() {
    if (this.selectGameListData.length !== 5) {
      this.toastr.error(this.status.SELECT_MINIMUM_FIVE_SLIP.name);
      return;
    }
    const checkSlipWager = await this.checkSlipWager();
    if (checkSlipWager) {
      return;
    } else {
      this.spinner.show();
      if (this.total < this.gameSelectWager) {
        this.toastr.error(this.status.MINIMUM_WAGER_ENTER.name);
        this.spinner.hide();
        return
      } else {
        var totalWager = {
          matchId: '',
          selection: '',
          wager: ''
        };
        var wagerCollect: any = []
        await this.toWinList.forEach((element: any, index: any) => {
          var data = {
            'matchId': element.matchId,
            'selection': element.selection,
            'amount': element.wager,
            'towin': parseInt(element.winAmount)
          }
          wagerCollect.push(data)
        });
        if (this.total > this.fixWager) {
          this.toastr.error(this.status.MAXIMUM_WAGER_ENTER.name);
          this.spinner.hide();
          return
        }
        this.objCollection = {
          brawlId: parseInt(this.brawlId),
          badge: this.badge,
          totalamount: this.total,
          potential_payout: this.potentialAmt.toString(),
          selections: wagerCollect
        }
        if (wagerCollect.length !== 5) {
          this.toastr.error(this.status.FILL_WAGER.name);
          this.spinner.hide();
          return;
        }
        this.api.postPrivate('brawls/submit-brawl-ticket', this.objCollection).subscribe({
          next: async (data) => {
            if (data.code === 200) {
              this.spinner.hide();
              this.toastr.success(this.status.JOIN_BRAWL_SUCCESS.name);
              this.activeModal = this.modalService.open(AdvertisingDialogBoxComponent, {size:'lg' ,centered: true , backdrop : 'static', keyboard : false})
              this.route.navigate(['/brawls']);
            }
          },
          error: err => {
            this.spinner.hide();
            this.toastr.error(err.error.error);
          }
        })
      }
    }

  }


  get brawlslip() {
    return this.selectGameListData.length
  };

  numberOnly(event: any): boolean {
    if (event.target.selectionStart == 5) {
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  changeSelection(data: any, index: any, matchId: any) {
    this.selectGameListData[index].selection = data;
    this.toWinList.forEach((element: any) => {
      if (element.matchId == matchId) {
        element.selection = data;
      }
    });
  }

  getNUmberData(data: any): any{
    if(data > 0){
      return '+'+data
    } else{
      return data
    }
  }


}
