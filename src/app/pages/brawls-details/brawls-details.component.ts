import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { ApiService } from 'src/app/service/api.service';
import { BrawlsSlipComponent } from '../common-components/brawls-slip/brawls-slip.component';
import { BrawlsTeamsListComponent } from '../common-components/brawls-teams-list/brawls-teams-list.component';
import { TimeFormat } from 'src/app/service/validation/timeformat';
import { BrawlPlayerListComponent } from '../brawl-player-list/brawl-player-list.component';
import { AdvertisingDialogBoxComponent } from '../common-components/advertising-dialog-box/advertising-dialog-box.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-brawls-details',
  templateUrl: './brawls-details.component.html',
  styleUrls: ['./brawls-details.component.css']
})
export class BrawlsDetailsComponent implements OnInit {
  selectedGameData: any = null;
  newSelectedGameData: any = null;
  newSelectedPlayerData: any = null;
  @ViewChild(BrawlsSlipComponent) child: BrawlsSlipComponent;
  @ViewChild(BrawlsTeamsListComponent) removeSelectedData: BrawlsTeamsListComponent;
  @ViewChild(BrawlPlayerListComponent) removePlayerData: BrawlPlayerListComponent;
  @Input() wagerTotal: any = 0;
  removeData: any;
  showGameData: any;
  @Input() toWinTotal: any = 0;
  @Input() potential: any = 0;
  @Input() selectedCardLength: any;
  id: any;
  lengthSlip: any = 0;
  active = 1;
  totalCount: any = 0;
  isBadges: any;
  activeModal: any;
  constructor(
    private brawlsTeamsListComponent: BrawlsTeamsListComponent,
    private brawlPlayerListComponent:BrawlPlayerListComponent,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrServiceProvider,
    private timeFormat: TimeFormat,
    private route: ActivatedRoute ,
    private _route:Router
  ) {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id')
    }
  }

  ngOnInit(): void {
    this.getGameData();
  }

  transformDate(data: any) {
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix
  }

  getGameData() {
    this.spinner.show();
    this.api.getPrivateTime('brawls/brawl-detail/' + this.id).subscribe({
      next: async (data) => {
        if (data.code === 200) {
          await data.data.payout.forEach((element: any, i: any) => {
            if (i == 0) {
              data.data.potential = element.amount;
            }
          });          
          this.showGameData = data.data;                 
          this.isBadges = data.data.isbadges;
          this.spinner.hide();
          if(data?.data?.league == 'PGA'){
            this.active = 2;
          }          
        }
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

  async setGameData(gameData: any) { 
    gameData.isbadges = this.isBadges
    gameData.brawlId = this.id
    this.selectedGameData = gameData;
    if (this.selectedGameData.key == 'team') {
      await this.child.loadData(this.selectedGameData);
      this.lengthSlip = this.child.brawlslip;
    } else if (this.selectedGameData.key == 'player') {
      await this.child.loadData(this.selectedGameData);
      this.lengthSlip = this.child.brawlslip;
    }

  }

  checkTotalCount(count: any) {
    this.totalCount = count;
  }

  setCountData(gameData: any) {
    this.totalCount = gameData;
  }

  ngOnChanges(): void {
  }

  allClear() {
    this.selectedGameData = null
  }

  async clearGameData() {
    this.totalCount = 0;
    if(this.newSelectedGameData){
      this.brawlsTeamsListComponent.clearSelectedData(this.newSelectedGameData);
    } 
    if(this.newSelectedPlayerData){
      this.brawlPlayerListComponent.clearAll(this.newSelectedPlayerData);
    }
    await this.child.clearTeamAll();
    this.lengthSlip = this.child.brawlslip;
    this.wagerTotal = 0;
    this.potential = 0;
    this.toWinTotal = 0;
  }

  async removeGameData(data: any) {
    this.totalCount = this.totalCount - 1;
    if (data.key == 'team') {
      this.removeData = data;  
      this.brawlsTeamsListComponent.removeSelectedData(this.removeData,this.newSelectedGameData);
      this.lengthSlip = this.child.brawlslip;
    } else if(data.key == 'player'){
      this.removeData = data;
      this.brawlPlayerListComponent.removePlayerData(this.removeData,this.newSelectedPlayerData);
      this.lengthSlip = this.child.brawlslip;
    }
  }


  submitBrawlTicket() {   
    this.child.submitBrawlTicket();
  }

  setNewGameData(data:any){
    this.newSelectedGameData = data;
  }

  setNewPlayerData(data:any){
    this.newSelectedPlayerData = data;
  }


  payBuddyBucks(data: any) {
    this._route.navigate(['/pay-out/'+data._id]);
  }

}
