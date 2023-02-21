import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from '../../service/validation/password.match';
import { PasswordValidator } from '../../service/validation/email';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { ClassList } from '../../service/validation/classList'
import { ApiService }from "../../service/api.service";
import { NgxSpinnerService } from "ngx-spinner";
import { HeaderSet } from "../../service/header.service";
import { Status } from "../../constant";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordNew = 'password';
  passwordConf = 'password';
  show: any;
  showCon: any;
  reset_form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  })
  submitted = false;
  status: any = Status;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    public toastr: ToastrServiceProvider,
    private listClass : ClassList,
    private api : ApiService,
    private spinner: NgxSpinnerService,
    private headerLoad: HeaderSet
  ) { 
    this.listClass.add('app-reset-password') ;
  }

  ngOnInit(): void {
    this.reset_form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(40), PasswordValidator.strong]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    )
    if(this.headerLoad.session == undefined){
      this.toastr.error(this.status.SESSION_EXPIRED.name); 
      this._router.navigateByUrl('/login')
      return
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

  get f(): { [key: string]: AbstractControl } {
    return this.reset_form.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.reset_form.invalid) {
      return;
    }
    this.spinner.show();
    this.api.postSession('user/reset-password',this.reset_form.value).subscribe({
      next:data =>{        
        this.spinner.hide();
        if(data.code === 200){ 
          this._router.navigateByUrl('/login');
          this.toastr.success(data.msg);
        }else{
          this.toastr.error(data.msg); 
        }
      },error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })   

  }


  ngOnDestroy() {
    this.listClass.destroy('app-reset-password') ;
  }

}
