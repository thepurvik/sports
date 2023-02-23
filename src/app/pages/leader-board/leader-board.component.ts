import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { Status } from 'src/app/constant';
import { ApiService } from 'src/app/service/api.service';
import { AddBuddyComponent } from '../common-components/add-buddy/add-buddy.component'
import { LocalstorageService } from '../../service/localstorage.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {
  status: any = Status;
  leaderBoard: any = [];
  scoreLeaderBoard: any;
  playerData: any;
  page = 1;
  active = 1;
  closeResult = '';
  id: any;
  activeModal: any;
  _id:any;

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrServiceProvider,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private _store : LocalstorageService
  ) {
    this._id = JSON.parse(this._store.getItem('userInfo'))?._id;    
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id')
    }
  }

  ngOnInit(): void {
    this.leaderBoard = [
      {
        id: '1st',
        image: 'assets/images/avatar.jpg',
        name: 'Grégory Rolland',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '2nd',
        image: 'assets/images/avatar.jpg',
        name: 'Jeremy Carter',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '3rd',
        image: 'assets/images/avatar.jpg',
        name: 'Hugo Chauvin',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '4th',
        image: 'assets/images/avatar.jpg',
        name: 'Saar van Doorn',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '5th',
        image: 'assets/images/avatar.jpg',
        name: 'Stephen Tucker',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '6th',
        image: 'assets/images/avatar.jpg',
        name: 'Élise Riviere',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '7th',
        image: 'assets/images/avatar.jpg',
        name: 'Lucía Hernández',
        buddy_buck: 14,
      },
      {
        id: '8th',
        image: 'assets/images/avatar.jpg',
        name: 'Carl Hunt',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '9th',
        image: 'assets/images/avatar.jpg',
        name: 'Eko Salim',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '10th',
        image: 'assets/images/avatar.jpg',
        name: 'Hannah Dean',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '11th',
        image: 'assets/images/avatar.jpg',
        name: 'Timéo Jacob',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '12th',
        image: 'assets/images/avatar.jpg',
        name: 'Filipe Díaz',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '13th',
        image: 'assets/images/avatar.jpg',
        name: 'Jose Morris',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      },
      {
        id: '14th',
        image: 'assets/images/avatar.jpg',
        name: 'Élise Riviere',
        buddyBucksamount: '$20,000',
        buddy_buck: 14,
      }
    ]

    this.getBrawlLeaderBoardApi();
  }

  getBrawlLeaderBoardApi() {
    this.spinner.show();
    this.api.getPrivate('score/get-brawls-leaderboard/' + this.id).subscribe({
      next: data => {
        if (data.code === 200) {
          let collection: any = [];
          data?.data.forEach((element: any, index: any) => {
            let change: any = {}
            change['buddy_buck'] = element['amount'];
            change['buddy_brawl'] = element['total_entry'];
            change['image'] = element['profileImage'];
            change['id'] = element['rank'];
            change['name'] = element['name'];
            change['belts_won'] = element['badge'];
            change['buddy_id'] = element['userId'];
            change['type'] = 'score';
            change['buddyExist'] = element['buddyExist']
            collection.push(change);
            if (element['rank'] == 1 || element['rank'] == '') {
              change['win_img'] = 'assets/images/gold.png'
            }
            if (element['rank'] == 2) {
              change['win_img'] = 'assets/images/silver.png'
            }
            if (element['rank'] == 3) {
              change['win_img'] = 'assets/images/bronze.png'
            }
          });          
          this.scoreLeaderBoard = collection;
          this.scoreLeaderBoard = this.scoreLeaderBoard.sort(function(a: any, b: any) { 
            return a.id - b.id;
          });
        }
        this.spinner.hide();
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

  openLeaderBoardModel(playerData: any) {
    this.playerData = playerData;    
    this.activeModal = this.modalService.open(AddBuddyComponent, { ariaLabelledBy: 'modal-basic-title' });
    this.activeModal.componentInstance.playerData = this.playerData;
    this.activeModal.componentInstance.typeLeaderbord = true;
    this.activeModal.result.then((result: any) => {
      this.getBrawlLeaderBoardApi();
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  addFriend(id: number) {
    this.api.getPrivate('account/add-buddy/' + id).subscribe({
      next: data => {
        if (data.code === 200) {
          this.toastr.success(this.status.ADD_BUDDY.name);
          this.activeModal.close()
          this.modal.close();
          this.spinner.hide();
        }
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

  removeFriend(id: number) {
    this.api.getPrivate('account/remove-buddy/' + id).subscribe({
      next: data => {
        if (data.code === 200) {
          this.toastr.success(this.status.REMOVE_BUDDY.name);
          this.activeModal.close()
          this.modal.close();
          this.spinner.hide();
        }
      },
      error: err => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      }
    })
  }

}
