import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthGuardService } from "../../service/auth-guard.service" ;
import { ApiService }from "../../service/api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../service/localstorage.service';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { PasswordValidator } from '../../service/validation/email';
import { SocialAuthService , SocialUser} from 'angularx-social-login';
import { ClassList } from '../../service/validation/classList'
import { CookieService } from 'ngx-cookie-service';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HeaderSet } from "../../service/header.service";
import { Status } from '../../constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisingDialogBoxComponent } from 'src/app/pages/common-components/advertising-dialog-box/advertising-dialog-box.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  passwordNew = 'password';
  currentCountry : any = null;
  show : any;
  settings : any = false;
  login_form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  submitted = false;
  status: any = Status;
  AuthGuardService: any;
  auth2: any;
  activeModal:any;
  @ViewChild('loginRef') loginElement!: ElementRef;
  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private authService: AuthGuardService,
    private _router: Router,
    private _store : LocalstorageService, // for local storege use
    public toastr : ToastrServiceProvider,
    private socialService: SocialAuthService,
    private listClass : ClassList,
    private api : ApiService,
    private headerSetUp: HeaderSet,
    private route: ActivatedRoute,
    public cookieService: CookieService,
    private modalService: NgbModal
  ) {
    this.listClass.add('app-login') ;
    var param = this.route.snapshot
    const paramMap = param.params['id']    
    if(paramMap){            
    }else{
      this.getLocation();
    }
   }
  

  ngOnInit(): void {
    this.googleAuthSDK();
    this.login_form = this.formBuilder.group(
      {
        email: ['',[Validators.required,Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(40)]]
      }
    )
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
          "referalCode" : "",
          "gender" : "",
          "password" : "",
          "profileImage" : profile.getImageUrl(),
          "countryCode" : "+1" ,
          "mobile" : "",
          "dob" : "" ,
          "platform" : 'google' ,
          "accessToken" : googleAuthUser.getAuthResponse().access_token
        }        
        this.loadSocial(obj);
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
    return this.login_form.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.login_form.invalid) {   
      return;
    }
    this.spinner.show();
    this.api.postPublic('user/sign-in',this.login_form.value).subscribe({
      next:data =>{
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
          this.getAdvList();
        }else{
          this.spinner.hide();
          this.toastr.error(data.msg);
        }  
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }
    getAdvList(){
      this.api.getPrivate('account/get-advertisement-list').subscribe(res=>{
       if(res.data == ''){
        this._router.navigateByUrl('/home')
       }else{
        this.activeModal = this.modalService.open(AdvertisingDialogBoxComponent, {size:'lg' ,centered: true , backdrop : 'static', keyboard : false});
        this._router.navigateByUrl('/home')
       }
    })
  }
  // Login Social
  loadSocial(obj:any){
    this.api.postPublic('user/social-sign-up',obj).subscribe({
      next:data =>{
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
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }

  hideShowPassNew() : void{    
    if (this.passwordNew === 'password') {

      this.passwordNew = 'text';

      this.show = true;

    } else {

      this.passwordNew = 'password';

      this.show = false;

    }
  }

  // Auth Service Facebook login
  signInWithFB(): void {
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(SocialUser_Fb => 
      {
        this.spinner.show();
        var obj = {
          "email" : SocialUser_Fb.email ,
          "name" : SocialUser_Fb.name ,
          "appId" : SocialUser_Fb.id ,
          "referalCode" : "",
          "gender" : "",
          "password" : "",
          "profileImage" : SocialUser_Fb.photoUrl,
          "countryCode" : "+1" ,
          "mobile" : "",
          "dob" : "" ,
          "platform" : 'facebook',
          "accessToken" : SocialUser_Fb.authToken
        }
        this.loadSocial(obj);
      }
    );
  }

  ngOnDestroy() {
    this.listClass.destroy('app-login') ;
  }

  getLocation() {
    this.authService.getPublic().subscribe({
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
