import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormGroup,FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Status } from 'src/app/constant';
import { ApiService }from "../../service/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { ActivatedRoute , Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisingDialogBoxComponent } from '../common-components/advertising-dialog-box/advertising-dialog-box.component';
@Component({
  selector: 'app-create-brawl',
  templateUrl: './create-brawl.component.html',
  styleUrls: ['./create-brawl.component.css']
})
export class CreateBrawlComponent implements OnInit {
  @ViewChild('searchbar') searchInput: ElementRef;
  brawlInfo: any = [];
  inviteType:boolean = false
  searchUseList: any = [];
  selectedUser: any = [];
  isInvite: boolean = true;
  date:any;
  activeModal: any;
  title:any = 'Create a Brawl'
  createBrawlsForm : FormGroup;
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  stepOne:any = {
    disabled: STEP_STATE.normal,
  }
  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    lang:{ next: 'NEXT', previous: 'BACK' },
    toolbarSettings: {
      showPreviousButton:true
    },
    anchorSettings:{
      anchorClickable:false
    }
  };
  showMe:boolean = true;
  submitted: boolean = false;
  status: any = Status;
  totalEntry:any = [];
  selectedEntry:any = null;
  selectedBadges:any = null;
  teams: any;
  createBrawlId: any;
  // public searchInput: String = '';
  public searchResult:any = [];
  private _label: any;
  list:any = [];
  public limit = 5;
  profileName: any;
  constructor(
    private ngWizardService: NgWizardService,
    private fb:FormBuilder,
    private api : ApiService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public toastr: ToastrServiceProvider,
    private route: ActivatedRoute ,
    private _router: Router,
    ) { 
      if (this.route.snapshot.paramMap.get('id')) {
        this.inviteType = true;
        this.profile();
        this.createBrawlId = this.route.snapshot.paramMap.get('id');
        this.config.lang.next = "DONE";
        this.title = 'Invite a Brawl';
        this.config.toolbarSettings = {
          showPreviousButton:true,
          toolbarExtraButtons: [
            { text: 'INVITE', class: 'btn btn-warning font-weight-bold', event: () => {this._router.navigateByUrl('/home')}}
          ]
        }
      }else{
        this.config.toolbarSettings = {
          showPreviousButton:true,
          toolbarExtraButtons: [
            { text: '', class: 'invisible'}
          ]
        }
      }
    }

  ngOnInit(): void {
    this.brawlInfo = [
      {
        id: 1,
        icon: 'assets/images/NFL.svg',
        name: 'NFL'
      },
      {
        id: 2,
        icon: 'assets/images/MLB.svg',
        name: 'MLB'
      },
      {
        id: 3,
        icon: 'assets/images/NFL.svg',
        name: 'CFB'
      },
      {
        id: 4,
        icon: 'assets/images/CBB.svg',
        name: 'CBB'
      },
      {
        id: 5,
        icon: 'assets/images/NHL.svg',
        name: 'NHL'
      },
      {
        id: 6,
        icon: 'assets/images/PGA.svg',
        name: 'PGA'
      },
      {
        id: 7,
        icon: 'assets/images/CBB.svg',
        name: 'NBA'
      }
    ]

    this.searchUseList = [
      {
        id: 1,
        image: 'assets/images/avatar.jpg',
        name: 'Ahmadali Maknojiya'
      },
      {
        id: 2,
        image: 'assets/images/avatar.jpg',
        name: 'Abhi Changela'
      },
      {
        id: 3,
        image: 'assets/images/avatar.jpg',
        name: 'Parth Parikh'
      },
      {
        id: 4,
        image: 'assets/images/avatar.jpg',
        name: 'Khodu Gohel'
      },
      {
        id: 5,
        image: 'assets/images/avatar.jpg',
        name: 'Yash Sampat'
      },
      {
        id: 6,
        image: 'assets/images/avatar.jpg',
        name: 'Riya Rami'
      },
      {
        id: 7,
        image: 'assets/images/avatar.jpg',
        name: 'Virendra Nagda'
      }
    ]

    this.createBrawlsForm = this.fb.group({
      league : ['',[Validators.required]],
      selectAll:[''],
      teams:['',[Validators.required]],
      totalentry:['',[Validators.required]],
      title:['',[Validators.required]],
      entryamount:['10000',[Validators.required]],
      isbadges:['',[Validators.required]],
      isfeatured:['',[Validators.required]],
    })  

    this.totalEntry = [
      {
        entryName:'Head to Head',
        value:2
      },
      {
        entryName:'5 Players',
        value:5
      },
      {
        entryName:'10 Players',
        value:10
      }
      // {
      //   entryName:'20 Players',
      //   value:20
      // },
      // {
      //   entryName:'25 Players',
      //   value:25
      // },
      // {
      //   entryName:'50 Players',
      //   value: 50
      // },
      // {
      //   entryName:'100 Players',
      //   value:100
      // },
    ]
  }

  get f(): { [key: string]: AbstractControl } {        
    return this.createBrawlsForm.controls;
  }

  getmatch(name:any){
    this.spinner.show();
    let data = {"league":name};
    this.api.postPrivate('brawls/get-brawl-created-list',data).subscribe({
      next:data =>{
        this.spinner.hide();
        if(data.code == 200){
          this.date = data.data;
        };
      },
      error:err=>{
        this.spinner.hide();
      }
    })
  }

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {    
    this.submitted = true;    
    if(args.direction == 'forward'){
      if(args.fromStep.title == 'Sport'){ 
        if(this.createBrawlsForm.controls['league'].status == 'INVALID'){
          return false;
        }else{          
          this.submitted = false;
          this.getmatch(this.createBrawlsForm.controls['league'].value);
          return true;
        }
      }
  
      if(args.fromStep.title == 'Date and Time'){
        if(this.createBrawlsForm.controls['teams'].status == 'INVALID'){
          return false;
        }else{
          this.submitted = false;
          return true;
        }
      }
  
      if(args.fromStep.title == 'Details'){      
        if(this.createBrawlsForm.controls['isfeatured'].status == 'INVALID' || this.createBrawlsForm.controls['isbadges'].status == 'INVALID' || this.createBrawlsForm.controls['entryamount'].status == 'INVALID' || this.createBrawlsForm.controls['totalentry'].status == 'INVALID' || this.createBrawlsForm.controls['title'].status == 'INVALID'){
          return false;
        }else{
          this.submitted = false;
          this.submit();
          return true;
        }
      }
    }else{
      if(args.toStep.title == 'Sport'){
        if(this.createBrawlsForm.controls['league'].status == 'INVALID'){
          return false;
        }else{
          this.submitted = false;
          return true;
        }
      }
  
      if(args.toStep.title == 'Date and Time'){          
        if(this.createBrawlsForm.controls['teams'].status == 'INVALID'){
          return false;
        }else{
          this.submitted = false;
          return true;
        }
      }
  
      if(args.toStep.title == 'Details'){    
        if(args.toStep.status == 'done'){
          this._router.navigateByUrl('/home')
          return true;
        }
      }
      
    }    
    return false;
  }

  isValidTypeBoolean: boolean = true;

  profile(){
    this.api.getPrivate('user/get-profile').subscribe({
      next:data =>{        
        if(data.code === 200){          
          this.profileName = data.data.name;
          
        }
      }
    })
  }

  async loadChangeKey(data:any){
    
    const pro = new Promise((resolve, reject) => {
      const dt:any = []
      data.map((u:any) => {
        if(u.key == 'run_spread'){
          u.key = 'runspread'
        }
        if(u.key == 'money_line'){
          u.key = 'moneyline'
        }
      });
      resolve(data)
    })
    return pro
    
  }

  async submit(){    
    this.spinner.show();
    const params = this.date.findIndex((p:any) => p.date == this.createBrawlsForm.value.teams);
    const newData = this.date[params].matchs;
    for await (const iterator of newData) {
      let dt = await this.loadChangeKey(iterator.details);
      iterator.details = dt;
    }           
    var object = {
      "league":this.createBrawlsForm.value.league,
      "date": newData[0].gameDate.replace('T', ' '),
      "title" : this.createBrawlsForm.value.title,
      "isfeatured" : parseInt(this.createBrawlsForm.value.isfeatured),
      "totalentry" : parseInt(this.createBrawlsForm.value.totalentry),
      "isbadges" : parseInt(this.createBrawlsForm.value.isbadges),
      "entryamount" : parseInt(this.createBrawlsForm.value.entryamount),
      "status" : 1,
      "teams" : newData
    }    
    this.api.postPrivate('brawls/create-brawls',object).subscribe({
      next:data =>{        
        this.spinner.hide();
        if(data.code == 200){
          this.profile();
          this.createBrawlsForm.reset();
          this.createBrawlId = data.data.brawlId;
          this.config.lang.previous = "INVITE";
          this.toastr.success(this.status.CREATE_BRAWL.name); 
        };
      },
      error:err=>{
        this.toastr.error(err.error.error); 
        this.spinner.hide();
      }
    })
  }
  inviteFriends() {
    this.isInvite = false;
  }

  numberOnly(event:any): boolean {   
    if(event.target.selectionStart == 5){
      return false;
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

  showPreviousStep(event?: Event) {    
    this.ngWizardService.previous();
  }
 
  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }
 
  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }
 
  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }
 
  stepChanged(args: StepChangedArgs) {  
    return true
  }

  async fetchSeries(value:String){  
    this.showMe = false;  
    if(value == ''){      
      this.searchResult = [];
      this.selectedUser = [];
    }else{
      this.api.getPrivate('account/my-buddy?search='+value).subscribe({
        next:data =>{
          if(data.code == 200){
            this.searchUseList = data.data;
            this.selectedUser = this.searchUseList.filter((item:any)=>{
              return item.name.toLowerCase().startsWith(value.toLowerCase())            
            })
          };
        },
        error:err=>{
        }
      })
    }
    
  }
  removeSearchValue(){
    this.searchInput.nativeElement.value = '';
    this.selectedUser.length = 0;
    this.showMe = true;
  }
  invite(id:any){
    this.spinner.show();    
    let data = {
      "brawlId" : this.createBrawlId,
      "buddyId" : id
    }    
    this.api.postPrivate('brawls/invite-buddy',data).subscribe({
      next:data =>{
        this.spinner.hide();
        if(data.code == 200){
          this.toastr.success(this.status.INVITE_BUDDY.name); 
        };
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }
}
