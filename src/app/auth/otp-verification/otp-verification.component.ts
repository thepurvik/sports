import { Component, Input, OnInit , Injectable} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ClassList } from '../../service/validation/classList'
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { Router } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage.service';
import { ApiService }from "../../service/api.service";
import { HeaderSet } from "../../service/header.service";
import { Status } from "../../constant";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root' // just before your class
})
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  otp_form: FormGroup = new FormGroup({
    otp: new FormControl(''),
    type: new FormControl('')
  });
  submitted = false;
  Forgotsteps:any
  Forgotsteps_condition:any = false;
  status: any = Status;

  constructor(
    private formBuilder: FormBuilder,
    private listClass : ClassList ,
    private spinner: NgxSpinnerService,
    public toastr : ToastrServiceProvider ,
    private _router: Router,
    private api : ApiService,
    private _store : LocalstorageService, // for local storege use
    private headerLoad: HeaderSet,
    public cookieService: CookieService
  ) {
    this.Forgotsteps = this._router.getCurrentNavigation()
    this.listClass.add('app-otp-verification') ;
   }

  ngOnInit(): void {        
    if(this.Forgotsteps.extras.state !== undefined){
      this.Forgotsteps_condition = this.Forgotsteps.extras.state.Forgotsteps ;
    }
    this.otp_form = this.formBuilder.group(
      {
        otp: ['',[Validators.required,Validators.pattern("[0-9]{6}"),Validators.maxLength(6)]],
        type:['email']
      }
    )
    if(this.headerLoad.session == undefined){
      this.toastr.error(this.status.SESSION_EXPIRED.name); 
      this._router.navigateByUrl('/login')
      return
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.otp_form.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.otp_form.invalid) {   
      return;
    }
    this.spinner.show();
    var otp : Number = JSON.parse(this.otp_form.value['otp'])
    this.otp_form.controls['otp'].setValue(otp)
    this.api.postSession('user/otp-verifiy',this.otp_form.value).subscribe({
      next:data =>{
        this.spinner.hide();
        if(data.code === 200){  
          if(data.data['emailVerified'] == '0'){
            this.toastr.error(this.status.EMAIL_NOT_VERIFY.name);
            this._router.navigateByUrl('/login')
            return
          }

          if(this.Forgotsteps_condition && this.Forgotsteps.extras.state !== undefined){
            if(data.data['platform']){
              this.toastr.error(this.status.SSO_NOT_ALLOW_FORGOT_PASSWORD.name);
              this._router.navigateByUrl('/login')
            }else{
              this.toastr.success(data.msg);
              this._router.navigateByUrl('/reset-password')
            }            
          }else{
            this.toastr.success(data.msg);
            this._store.setItem('userInfo',JSON.stringify(data.data));
            var dt:any = new Date();    
            var dt3 = dt.setHours(dt.getHours() + 24 );
            var dt4:any = new Date(dt3)
            this.cookieService.set('userExpire',dt3,dt4,'/');
            this._router.navigateByUrl('/home')
          }
          
        }
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })    
  }


  ngOnDestroy() {
    this.listClass.destroy('app-otp-verification') ;
  }
}
