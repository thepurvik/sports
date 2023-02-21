import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import Validation from '../../service/validation/password.match';
import { Router , ActivatedRoute} from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PasswordValidator } from '../../service/validation/email';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ApiService }from "../../service/api.service";
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { NgxSpinnerService } from "ngx-spinner";
import { ClassList } from '../../service/validation/classList'
import { LocalstorageService } from '../../service/localstorage.service';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HeaderSet } from "../../service/header.service";
import { Status } from "../../constant";
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: NgbDateStruct;
  minDate: Date;
  maxDate: Date;
  passwordNew = 'password';
  passwordConf = 'password';
  show: any;
  showCon: any;
  chech_define = 'agree';
  checkbox = false;
  user: SocialUser;
  currentCountry : any = null;
  settings : any = false;
  GoogleLoginProvider = GoogleLoginProvider;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    birthday: new FormControl(''),
    referalCode: new FormControl(''),
    countryCode: new FormControl(''),
    dob : new FormControl('')
  });
  submitted = false;
  newMaxDate: { day: number; month: number; year: number; };
  status: any = Status;
  auth2: any;
  @ViewChild('loginRef') loginElement!: ElementRef;
  constructor(private formBuilder: FormBuilder,
    private authService: SocialAuthService,
    private api : ApiService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrServiceProvider,
    private listClass : ClassList,
    private _store : LocalstorageService, // for local storege use,
    private route: ActivatedRoute,
    private authGuardService: AuthGuardService,
    private headerSetUp: HeaderSet,
    public cookieService: CookieService

  ) {
    this.getLocation();
    this.listClass.add('app-register') ;
    this.maxDate = new Date();    
    this.maxDate.setDate(this.maxDate.getDate() - (18 * 365));
    this.newMaxDate = { day: this.maxDate.getDate(), month: this.maxDate.getUTCMonth() + 1, year: this.maxDate.getUTCFullYear() };
  }

  ngOnInit(): void {
    this.googleAuthSDK();
    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(40), PasswordValidator.strong ]],
        confirmPassword: ['', Validators.required],
        birthday: ['', Validators.required],
        referalCode: [''],
        countryCode: ['+1'],
        dob: [''],
        gender: ['m']
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )

    var {queryParams} = this.route.snapshot
    const paramMap = queryParams
    if(paramMap['code']){      
      this.form.get('referalCode').setValue(paramMap['code']);
    }
  }

  callLogin() {    
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();        
        this.spinner.show();
        var obj = {
          "email" : profile.getEmail() ,
          "name" : profile.getName() ,
          "appId" : profile.getId() ,
          "referalCode" : this.form.value['referalCode'],
          "gender" : "",
          "password" : "",
          "profileImage" : profile.getImageUrl(),
          "countryCode" : "+1" ,
          "mobile" : "",
          "dob" : "" ,
          "platform" : 'google' ,
          "accessToken" : googleAuthUser.getAuthResponse().access_token
        }
        this.loadData(obj);
      }, (error: any) => {
      });

  }

  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          client_id: '725573869746-s3kcrdo8hto4jir6pupi6mv88nr3lpun.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email',
          plugin_name:'App Name that you used in google developer console API'
        });
        this.callLogin();
      });
    }

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  get f(): { [key: string]: AbstractControl } {    
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid || this.checkbox == false) {
      return;
    }else{
      this.spinner.show();
      let date = this.form.value['birthday']['year'] + '-' + this.form.value['birthday']['month'] + '-' + this.form.value['birthday']['day']
      this.form.controls['dob'].setValue(date);
      this.api.postPublic('user/sign-up',this.form.value).subscribe({
        next : data => {
          this.spinner.hide();
          if(data.code === 200){
            this.form.reset()
            this.toastr.success(data.msg);
            this._router.navigateByUrl('/otp-verification')
            this.headerSetUp.Authorization(data.data.token)
            this._store.setItem('_jwt',data.data.token)     
          }else{
            this.form.reset();
            this.toastr.error(data.msg);
          }
        },
        error: err =>{
          this.spinner.hide();
          this.toastr.error(err.error.error); 
        }
      })
    }
    
    
  }



  hideShowPassNew(): void {
    if (this.passwordNew === 'password') {

      this.passwordNew = 'text';

      this.show = true;

    } else {

      this.passwordNew = 'password';

      this.show = false;

    }
  }


  hideShowPassConfirm(): void {
    if (this.passwordConf === 'password') {

      this.passwordConf = 'text';

      this.showCon = true;

    } else {

      this.passwordConf = 'password';

      this.showCon = false;

    }
  }

  onCheckboxChange(e: any): void {

    if (e.target.value == 'agree') {

      this.checkbox = true;

      this.chech_define = 'not_agree';

    } else if (e.target.value == 'not_agree') {

      this.checkbox = false;

      this.chech_define = 'agree';
    }
  }

  //Sing-up (Social)
  loadData(obj:any){    
    this.api.postPublic('user/social-sign-up',obj).subscribe({
      next : data => {        
        this.spinner.hide();
        if(data.code === 200){   
          this._store.setItem('_jwt',data.data.token)     
          if(data.data['emailVerified'] == '0'){
            this.toastr.error(data.msg);
            this._router.navigateByUrl('/otp-verification')
            this.headerSetUp.Authorization(data.data.token)
            return
          }
          this.toastr.success(data.msg);
          this.headerSetUp.Authorization(data.data.token)
          this._store.setItem('userInfo',JSON.stringify(data.data));
          var dt:any = new Date();    
          var dt3 = dt.setHours(dt.getHours() + 24 );
          var dt4:any = new Date(dt3)
          this.cookieService.set('userExpire',dt3,dt4,'/');
          this._router.navigateByUrl('/home').then(() => {
            window.location.reload();
          });
        }else{
          this.spinner.hide();
          this.toastr.error(data.msg);
        }  
      },
      error: err =>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })

  }

  // Auth Service Facebook login
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(SocialUser_Fb => {
      this.spinner.show();
      var obj = {
        "email" : SocialUser_Fb.email ,
        "name" : SocialUser_Fb.name ,
        "appId" : SocialUser_Fb.id ,
        "referalCode" : this.form.value['referalCode'],
        "gender" : "",
        "password" : "",
        "profileImage" : SocialUser_Fb.photoUrl,
        "countryCode" : "+1" ,
        "mobile" : "",
        "dob" : "" ,
        "platform" : 'facebook' ,
        "accessToken" : SocialUser_Fb.authToken
      }
      this.loadData(obj)
    });
  }

  ngOnDestroy(){
    this.listClass.destroy('app-register') ;
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
