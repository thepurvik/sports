import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceProvider } from '../../../service/validation/toaster'
import { OrdinalPipe } from 'src/app/pipe/ordinal.pipe';
import { ApiService } from 'src/app/service/api.service';
import { Status } from "../../../constant";
import { LocalstorageService } from '../../../service/localstorage.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ClassList } from 'src/app/service/validation/classList';

@Component({
  selector: 'app-add-buddy',
  templateUrl: './add-buddy.component.html',
  styleUrls: ['./add-buddy.component.css']
})
export class AddBuddyComponent implements OnInit {
  @Input() playerData : any
  @Input() typeLeaderbord : any = false;
  @Input() userIdBoard : any
  status: any = Status;
  userId: any;
  constructor(
    private listClass: ClassList,
    private ordinalPipe:OrdinalPipe,
    private route: ActivatedRoute,
    public modal: NgbActiveModal,
    private api : ApiService,
    public toastr: ToastrServiceProvider,
    private spinner: NgxSpinnerService,
    private _store : LocalstorageService,
    private router: Router
  ) { 
    this.listClass.add('add-buddy-brawls');
  }
  
  ngOnInit(): void {    
    this.userId = JSON.parse(this._store.getItem('userInfo'))?._id;     
    if(this.typeLeaderbord == true){
      this.getBuddy(this.playerData.buddy_id);
      this.spinner.show();
    }
  }

  transform(n: number) {
    return this.ordinalPipe.transform(n);
  }

  addFriend(id:number){
      
    if(this.playerData.type == 'score'){
      this.api.getPrivate('account/add-buddy/'+id).subscribe({
        next:data =>{                              
          if(data.code === 200){
            this.toastr.success(this.status.ADD_BUDDY.name); 
            this.modal.close();
            this.spinner.hide();
          }
        },
        error:err=>{
          this.spinner.hide();
          this.toastr.error(err.error.error); 
        }
      })
    }
  }

  removeFriend(id: number){
    this.api.getPrivate('account/remove-buddy/'+id).subscribe({
      next:data =>{                              
        if(data.code === 200){
          this.toastr.success(this.status.REMOVE_BUDDY.name); 
          this.modal.close();
          this.spinner.hide();
        }
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }

  getBuddy(id:any){
    this.api.getPrivate(`score/buddy-profile/${id}`).subscribe({
      next:data =>{                              
        if(data.code === 200){
          // this.playerData.belt = data.data.belt
            this.playerData['total_win'] =  data.data.total_win;
            this.playerData['total'] =  data.data.total;
            this.spinner.hide();
        }
       
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }
  ngOnDestroy() {
    this.listClass.destroy('add-buddy-brawls');
  }
}
