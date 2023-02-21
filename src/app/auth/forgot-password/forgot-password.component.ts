import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { ClassList } from '../../service/validation/classList'
import { NgxSpinnerService } from "ngx-spinner";
import { OtpVerificationComponent } from "../otp-verification/otp-verification.component"
import { ApiService }from "../../service/api.service";
import { HeaderSet } from "../../service/header.service";
import { Status } from "../../constant";
import { AuthGuardService } from 'src/app/service/auth-guard.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot_form: FormGroup = new FormGroup({
    email: new FormControl(''),
  })
  submitted = false;
  active:any
  status: any = Status; 
  currentCountry : any = null;
  settings : any = false;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    public toastr : ToastrServiceProvider,
    private listClass : ClassList,
    private spinner: NgxSpinnerService,
    private _changeObj: OtpVerificationComponent,
    private api : ApiService,
    private authGuardService: AuthGuardService,
    private headerSetUp: HeaderSet,
  ) {
    this.listClass.add('app-forgot-password') ;    
    this.getLocation();
   }

  ngOnInit(): void {
    this.forgot_form = this.formBuilder.group(
      {
        email: ['',[Validators.required,Validators.email]],
      }
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.forgot_form.controls;
  }


  onSubmit(): void {
    this.submitted = true;    
    if (this.forgot_form.invalid) {   
      return;
    }
    this.spinner.show();
    this.api.postPublic('user/forgot-password',this.forgot_form.value).subscribe({
      next:data =>{
          this.spinner.hide();
          if(data.code === 200){
            this._changeObj.Forgotsteps = true
            this.headerSetUp.Authorization(data.data.token);
            this._router.navigateByUrl('/otp-verification', { state: { Forgotsteps:true} });
            this.toastr.success(data.msg);
          }else{
            this.toastr.error(data.msg);
          }
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }
  
  ngOnDestroy() {
    this.listClass.destroy('app-forgot-password') ;
  }

  getLocation() {
    this.authGuardService.getPublic().subscribe({
      next:data =>{                
        this.currentCountry = data.region;
        this.loadGeo();
      }
    })
  }

  async loadGeo () {    
    this.api.getPublic('account/get-settings').subscribe({
      next:data =>{        
        data.data.forEach(async (element:any) => {
          if(element.key == 'not_allow_states'){
            var notAllow = element.value;            
            for await (const iterator of notAllow) {
              if(this.currentCountry == iterator){
                this.settings = true;                
              }
            }
          }
        });
      },
      error:err=>{
      }
    })
  }

}
