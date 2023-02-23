import { Component, OnInit,ComponentRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../service/api.service';
import { ToastrServiceProvider } from '../../service/validation/toaster';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClassList } from '../../service/validation/classList';
import { Status } from '../../constant';
import { CookieService } from 'ngx-cookie-service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  imageError: string;
  image:any = false;
  model: NgbDateStruct;
  minDate: Date;
  maxDate: Date;
  passwordNew = 'password';
  passwordConf = 'password';
  show: any;
  showCon: any;
  chech_define = 'agree';
  checkbox = false;
  currentCountry: any = null;
  settings: any = false;
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;
  newMaxDate: { day: number; month: number; year: number };
  status: any = Status;
 ComponentRef:ComponentRef<1>

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrServiceProvider,
    private listClass: ClassList,
    public cookieService: CookieService,
  ) {
    this.listClass.add('app-register');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
      }
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get Img() {
    return this.image == false ? true : false
  }

  uploadToServer(event:any) { 
    this.imageError = null;   
    var file:File = event.target.files[0];
    var myReader:FileReader = new FileReader();
    const max_size = 10485760;
    const allowed_types = ['image/png', 'image/jpeg'];
    
    if (file.size > max_size) {
      return this.toastr.error('Maximum size allowed is ' + max_size / 1048576 + ' MB');
    }
    if (!allowed_types.includes(event.target.files[0].type)) {
      return this.toastr.error('Only Images are allowed ( JPG | PNG )');
    }
    myReader.onloadend = (e) => {
      this.image = myReader.result;
      this.image = this.image.replace(`data:${file.type};base64,`,"");      
    }
    myReader.readAsDataURL(file);
  }


  supportMail(){    
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    if(!this.image){
      return;
    }
    this.spinner.show();
    let param = {
      title : this.form.value?.title ,
      description : this.form.value?.description ,
      image : this.image
    }
    this.api.postPrivate('account/support-mail',param).subscribe({
      next:data =>{                
        if(data.code === 200){          
          this.activeModal.close();
          this.toastr.success(this.status.SUPPORT_MAIL.name);
        }
        this.spinner.hide();
      },
      error:err=>{
        this.spinner.hide();
        this.toastr.error(err.error.error); 
      }
    })
  }
  removeSupportForm(){
    this.activeModal.close();
  }
}
