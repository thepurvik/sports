import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddBuddyComponent } from '../common-components/add-buddy/add-buddy.component'
import { LocalstorageService } from 'src/app/service/localstorage.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  scoreInfo: any = [];
  page = 1;
  collectionSize: any = 0;
  pageSize = 10;
  activeModal: any;
  playerData: any;
  closeResult = '';
  userId:any;
  constructor(
    private listClass: ClassList,
    private _router: Router,
    private modalService: NgbModal,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private _store : LocalstorageService

  ) {
    this.listClass.add('app-brawls');
  }
  active = 1;

  ngOnInit(): void {    
    this.userId = JSON.parse(this._store.getItem('userInfo'))?._id;    
    // this.scoreInfo = [
    //   {
    //     id: 1,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Grégory Rolland',
    //     win_img: 'assets/images/gold.png',
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //     ],
    //     buddy_buck: 18500,
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 2,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Jeremy Carter',
    //     win_img: 'assets/images/silver.png',
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       },
    //     ],
    //     buddy_buck: 18500,
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 3,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Hugo Chauvin',
    //     buddy_buck: 18500,
    //     win_img: 'assets/images/bronze.png',
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 4,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Saar van Doorn',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 5,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Stephen Tucker',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 6,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Élise Riviere',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 7,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Lucía Hernández',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 8,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Carl Hunt',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 9,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Eko Salim',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 10,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Hannah Dean',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 11,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Timéo Jacob',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 12,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Filipe Díaz',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 13,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Jose Morris',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   },
    //   {
    //     id: 14,
    //     image: 'assets/images/avatar.jpg',
    //     name: 'Élise Riviere',
    //     buddy_buck: 18500,
    //     won_badges: [
    //       {
    //         badge: 'assets/images/badge3.svg'
    //       }
    //     ],
    //     buddy_brawl: 15,
    //     belts_won: 3
    //   }
    // ]
    this.getscoreboard();
  }

  getPremiumData() {
    this.getscoreboard();
  }

  getscoreboard() {
    this.spinner.show();
    this.api.getPrivate('score/global-leaderboard/' + this.page).subscribe({
      next: async data => {
        this.spinner.hide();
        if (data.code === 200) {
          let collection: any = [];
          data.data.data.forEach((element: any, index: any) => {
            let change: any = {}
            change['buddy_buck'] = element['buddyBucks'];
            change['total_win'] = element['total_win'];
            change['total'] = element['total'];
            change['image'] = element['profileImage'];
            change['id'] = element['rank'];
            change['name'] = element['name'];
            change['belts_won'] = element['totalbadge'];
            change['buddy_id'] = element['_id'];
            change['type'] = 'score';
            change['belt'] = element['belt']
            change['buddyExist'] = element['buddyExist']
            collection.push(change);
            if (element['rank'] == 1) {
              change['win_img'] = 'assets/images/gold.png'
            }
            if (element['rank'] == 2) {
              change['win_img'] = 'assets/images/silver.png'
            }
            if (element['rank'] == 3) {
              change['win_img'] = 'assets/images/bronze.png'
            }
          });
          this.collectionSize = data.data.count * this.pageSize;
          this.scoreInfo = collection;
        }
      },
      error: err => {
        this.spinner.hide();
        ;
      }
    })
  }

  openLeaderBoardModel(playerData: any) {
    this.playerData = playerData;
    this.activeModal = this.modalService.open(AddBuddyComponent, { centered: true })
    this.activeModal.componentInstance.playerData = this.playerData;
    this.activeModal.result.then((close: any) => {
      this.getscoreboard();
    }, (data: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(data)}`;
    })
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
  ngOnDestroy() {
    this.listClass.destroy('app-brawls');
  }
}
