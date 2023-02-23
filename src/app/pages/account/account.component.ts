import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ClassList } from '../../service/validation/classList';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ToastrServiceProvider } from '../../service/validation/toaster';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateStruct,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../common-components/dialog-box/dialog-box.component';
import { Location } from '@angular/common';
import { ClipboardService } from 'ngx-clipboard';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { PasswordValidator } from 'src/app/service/validation/email';
import Validation from 'src/app/service/validation/password.match';
import { Status } from '../../constant';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { TimeFormat } from 'src/app/service/validation/timeformat';
import { LocalstorageService } from 'src/app/service/localstorage.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  model: NgbDateStruct;
  activeModal: any;
  logoutData: any;
  closeData: any;
  resetData: any;
  purchaseBadges: any = [];
  badgeInfo: any = [];
  listFilterTransaction: any;
  listFilterHistory: any;
  beltsInfo: any;
  brawlHistoryInfo: any;
  transactionHistoryInfo: any;
  passwordCurr = 'password';
  passwordNew = 'password';
  passwordConf = 'password';
  showCurr: any;
  show: any;
  showCon: any;
  referralLink = 'WilliamKnight@123';
  domainAndApp: string;
  resetPassword: FormGroup;
  form: FormGroup;
  personalData: any;
  submitted = false;
  resetSubmitted = false;
  minDate: Date;
  maxDate: Date;
  imageProfile: any;
  socialUser = false;
  page = 1;
  selectBadges: any;
  pageHistory = 1;
  status: any = Status;
  collectionSizeTransaction: any;
  collectionSizeHistory: any;
  newMaxDate: { day: number; month: number; year: number };
  brawlHistoryData: any;
  brawlTransactionData: any;
  transactionDate: any = 1;
  transactionMax: any = 20;
  transactionType: any = 'month';
  HistoryDate: any = 1;
  HistoryType: any = 'month';
  historyfilter: any = true;
  buddyBucks: any;
  selectbucks: any = 0;
  creditAmount: any = 0;
  getStroageUserInfo:any;

  constructor(
    private listClass: ClassList,
    private _router: Router,
    private api: ApiService,
    public toastr: ToastrServiceProvider,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private loc: Location,
    private _clipboardService: ClipboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private timeFormat: TimeFormat,
    public cookieService: CookieService,
    private storageService : LocalstorageService,
    public datepipe: DatePipe,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.listClass.add('app-account');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 18 * 365);
    this.newMaxDate = {
      day: this.maxDate.getDate(),
      month: this.maxDate.getUTCMonth() + 1,
      year: this.maxDate.getUTCFullYear(),
    };
    const userData: any = JSON.parse(localStorage.getItem('userInfo'));
    if (userData.platform) {
      this.socialUser = true;
    }
  }
  title_: any = 'my account';
  selected: any = null;
  active = 'personalData';
  closeResult = '';
  bulkData: any;

  ngOnInit(): void {
    var { queryParams } = this.route.snapshot;
    const paramMap = queryParams;
    if(this.route.snapshot.paramMap.get('id') == 'badges'){
      this.active = 'badges';
      this.getBadgesList()
    }
    if (paramMap['type']) {
      this.spinner.show();
      if (paramMap['type'] == 'success') {
        let obj = {
          payerId: paramMap['PayerID'],
          paymentId: paramMap['paymentId'],
          amount: paramMap['amount'],
          item_type: paramMap['item_type'],
          itemsId: paramMap['itemsId'],
        };
        this.retrievePayment(obj);
      }

      if (paramMap['type'] == 'cancel') {
        let obj = {
          amount: paramMap['amount'],
          item_type: paramMap['item_type'],
          itemsId: paramMap['itemsId'],
        };
        this.cancelPayment(obj);
      }
    } else {
      this.buddyBucks = [
        {
          value: '1.99',
          buddybucks: 100000,
        },
        {
          value: '2.99',
          buddybucks: 250000,
        },
        {
          value: '4.99',
          buddybucks: 500000,
        },
      ];
      this.logoutData = {
        title: 'Logout Your Account',
        description: 'Are you sure you want to Logout?',
        button: 'Logout',
      };

      this.closeData = {
        title: 'Close Your Account',
        description: 'Are you sure you want to Close Your Account?',
        button: 'Close',
      };

      this.resetData = {
        title: 'Reset Your Account',
        description: 'Are you sure you want to Reset Your Account?',
        button: 'Reset',
      };

      // this.badgeInfo = [
      //   {
      //     id: 1,
      //     icon: 'assets/images/badge1.svg',
      //     name: 'Boxing Glove',
      //   },
      //   {
      //     id: 2,
      //     icon: 'assets/images/badge2.svg',
      //     name: 'Golf Club',
      //   },
      //   {
      //     id: 3,
      //     icon: 'assets/images/badge3.svg',
      //     name: 'Baseball Bat',
      //   },
      //   {
      //     id: 4,
      //     icon: 'assets/images/badge1.svg',
      //     name: 'lightning bolt',
      //   },
      //   {
      //     id: 5,
      //     icon: 'assets/images/badge2.svg',
      //     name: 'Rabbit’s foot',
      //   },
      //   {
      //     id: 6,
      //     icon: 'assets/images/badge3.svg',
      //     name: 'Trophy',
      //   },
      //   {
      //     id: 7,
      //     icon: 'assets/images/badge1.svg',
      //     name: 'Football',
      //   },
      //   {
      //     id: 8,
      //     icon: 'assets/images/badge2.svg',
      //     name: 'Golf Ball',
      //   },
      // ];

      this.beltsInfo = [
        {
          id: 1,
          image: 'assets/images/belts1.svg',
          name: 'Green Belts',
        },
        {
          id: 2,
          image: 'assets/images/belts2.svg',
          name: 'Black Belts',
        },
        {
          id: 3,
          image: 'assets/images/belts3.svg',
          name: 'Orange Belts',
        },
      ];

      this.brawlHistoryInfo = [
        {
          id: 1,
          rank: 1,
          date: 'SEP 8, 1:00PM ET',
          amount: '5,000 Buddy Buck',
          contestName: 'NFL $500K WILDCAT',
        },
        {
          id: 2,
          rank: 2,
          date: 'SEP 8, 1:00PM ET',
          amount: '10,000 Buddy Buck',
          contestName: 'NFL $350K LUXURY BOX',
        },
        {
          id: 3,
          rank: 3,
          date: 'SEP 8, 1:00PM ET',
          amount: '15,000 Buddy Buck',
          contestName: 'NBA SHOWDOWN $200K FADEAWAY',
        },
        {
          id: 4,
          rank: 4,
          date: 'SEP 8, 1:00PM ET',
          amount: '5,000 Buddy Buck',
          contestName: 'PGA TOUR $100K DRIVE THE GREEN',
        },
        {
          id: 5,
          rank: 5,
          date: 'SEP 8, 1:00PM ET',
          amount: '8,000 Buddy Buck',
          contestName: 'NFL $500K WILDCAT',
        },
        {
          id: 6,
          rank: 6,
          date: 'SEP 9, 1:00PM ET',
          amount: '5,000 Buddy Buck',
          contestName: 'NFL $350K LUXURY BOX',
        },
        {
          id: 7,
          rank: 7,
          date: 'SEP 10, 1:00PM ET',
          amount: '5,000 Buddy Buck',
          contestName: 'NBA SHOWDOWN $200K FADEAWAY',
        },
        {
          id: 8,
          rank: 8,
          date: 'SEP 8, 1:00PM ET',
          amount: '5,000 Buddy Buck',
          contestName: 'PGA TOUR $100K DRIVE THE GREEN',
        },
      ];

      this.transactionHistoryInfo = [
        {
          id: 1,
          date: 'SEP 8, 1:00PM ET',
          status: 1,
          contestName: '$2.99 for $250,000 Buddy Bucks',
        },
        {
          id: 2,
          date: 'SEP 8, 1:00PM ET',
          status: 2,
          contestName: '$1.99 for $100,000 Buddy Bucks',
        },
        {
          id: 3,
          date: 'SEP 8, 1:00PM ET',
          status: 2,
          contestName: '$1.99 for $100,000 Buddy Bucks',
        },
        {
          id: 4,
          date: 'SEP 8, 1:00PM ET',
          status: 1,
          contestName: '$0.99 for 2 badges',
        },
        {
          id: 5,
          date: 'SEP 8, 1:00PM ET',
          status: 3,
          contestName: '$2.99 for $250,000 Buddy Bucks',
        },
        {
          id: 6,
          date: 'SEP 9, 1:00PM ET',
          status: 2,
          contestName: '$1.99 for $100,000 Buddy Bucks',
        },
        {
          id: 7,
          date: 'SEP 10, 1:00PM ET',
          status: 1,
          contestName: '$1.99 for $100,000 Buddy Bucks',
        },
        {
          id: 8,
          date: 'SEP 8, 1:00PM ET',
          status: 3,
          contestName: '$0.99 for 2 badges',
        },
      ];

      this.listFilterTransaction = [
        {
          id: 1,
          value: '1 month',
          name: 'Current Month',
        },
        {
          id: 2,
          value: '2 month',
          name: 'From Last Month',
        },
        {
          id: 3,
          value: '3 month',
          name: 'From Last 3 Month',
        },
        {
          id: 4,
          value: '6 month',
          name: 'From Last 6 Month',
        },
      ];

      this.listFilterHistory = [
        {
          id: 1,
          value: '1 month',
          name: 'Current Month',
        },
        {
          id: 2,
          value: '2 month',
          name: 'From Last Month',
        },
        {
          id: 3,
          value: '3 month',
          name: 'From Last 3 Month',
        },
        {
          id: 4,
          value: '6 month',
          name: 'From Last 6 Month',
        },
      ];
      const angularRoute = this.loc.path();
      const url = window.location.href;
      this.domainAndApp = url.replace(angularRoute, '');
      this.personalInfoForm();
      this.getUserDataApi('Init');
    }
  }

  cancelPayment(obj: any) {
    this.api.postPrivate('payments/cancel-paypal', obj).subscribe({
      next: (data) => {
        this.spinner.hide();
        window.close();
        if (obj.item_type == 'badges') {
          this.active = 'badges';
        }

        if (obj.item_type == 'bucks') {
          this.active = 'buddyBucks';
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  retrievePayment(obj: any) {
    this.api.postPrivate('payments/success-paypal', obj).subscribe({
      next: (data) => {
        if (obj.item_type == 'badges') {
          this.active = 'badges';
        }

        if (obj.item_type == 'bucks') {
          this.active = 'buddyBucks';
        }
        this.toastr.success(
          obj.item_type.toUpperCase() + this.status.PURCHASE_SUCCESS.name
        );
        setTimeout(() => {
          this.spinner.hide();
          window.close();
          if (obj.item_type == 'badges') {
            this.active = 'badges';
          }

          if (obj.item_type == 'bucks') {
            this.active = 'buddyBucks';
          }
        }, 3000);
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  ngOnDestroy() {
    this.listClass.destroy('app-account');
  }

  getPremiumData() {
    this.getTransactionHistory();
  }

  getPremiumData2() {
    this.getBrawlHistory();
  }

  scroll() {
    window.scroll(0, 600);
  }

  // Personal Information Form
  personalInfoForm() {
    this.form = this.formBuilder.group({
      email: [{ value: '' }, Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      birthday: ['', Validators.required],
      dob: [''],
      countryCode: ['+1'],
    });

    this.resetPassword = this.formBuilder.group(
      {
        currentPwd: ['', Validators.required],
        newPwd: [
          '',
          [
            Validators.required,
            Validators.minLength(7),
            Validators.maxLength(40),
            PasswordValidator.strong,
          ],
        ],
        confirmNewPwd: ['', Validators.required],
      },
      {
        validators: [Validation.match('newPwd', 'confirmNewPwd')],
      }
    );
  }

  // Personal Information API
  getUserDataApi(type:string) {
    if(type == 'Init'){
      this.spinner.show();
      this.api.getPrivate('user/get-profile').subscribe({
        next: (data) => {
          if (data.code === 200) {
            this.personalData = data.data;
            this.imageProfile = data.data.profileImage;
            if (!data.data.profileImage) {
              this.imageProfile = 'assets/images/avatar.jpg';
            }
            this.referralLink = data.data.userReferalCode;
            this.creditAmount = data.data?.creditbadges;
            this.setPersonalInfo();
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        },
      });
    }else if(type == 'editProfile'){
      this.api.getPrivate('user/get-profile').subscribe({
        next: (data) => {
          if (data.code === 200) {
            this.personalData = data.data;
            this.imageProfile = data.data.profileImage;
            if (!data.data.profileImage) {
              this.imageProfile = 'assets/images/avatar.jpg';
            }
            this.referralLink = data.data.userReferalCode;
            this.creditAmount = data.data?.creditbadges;
            this.setPersonalInfo();
            this.spinner.hide();
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        },
      });
    }
  }

  //get-badges-list
  getBadgesList() {
    this.scroll();
    this.spinner.show();
    this.api.getPrivate('user/get-badges-list').subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.code === 200) {
          this.badgeInfo = data.data.mybadges;
          this.purchaseBadges = data.data.purchase;
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  // Set Form of Personal Data
  setPersonalInfo() {
    this.form.get('email').setValue(this.personalData?.email);
    this.form.get('email').disable();
    this.form.get('name').setValue(this.personalData?.name);
    this.form.get('gender').setValue(this.personalData?.gender);
    this.form.get('mobile').setValue(this.personalData?.mobile);
    let newDate = new Date(this.personalData.dob);
    let day = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let fullDate = {
      day: day,
      month: month + 1,
      year: year,
    };
    this.form.get('birthday').setValue(fullDate);
  }

  uploadToServer(event: any) {
    const fileName = event.target.files[0].name;
    var fileType = fileName.split('.')[1];
    if (event.target.files && event.target.files[0]) {
      if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'PNG') {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        this.api.postPrivate('user/upload-profile-pic', formData).subscribe({
          next: (data) => {
            if (data.code === 200) {
              this.imageProfile = data.data.profileImage;
              this.toastr.success(this.status.PROFILE_UPDATE.name);
              this.spinner.hide();
              this.getStroageUserInfo = JSON.parse(this.storageService.getItem('userInfo'));
              this.getStroageUserInfo.profileImage = this.imageProfile;   
              this.storageService.setItem('userInfo', JSON.stringify(this.getStroageUserInfo));
            }
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error);
          },
        });
      } else {
        this.toastr.error(this.status.VALID_FILE.name);
      }
    }
  }

  // Personal Information Submit API
  personalInfoSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.form.invalid) {
      this.spinner.hide();
      return;
    } else {
      
      let date =
        this.form.value['birthday']['year'] +
        '-' +
        this.form.value['birthday']['month'] +
        '-' +
        this.form.value['birthday']['day'];

      let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
      this.form.controls['dob'].setValue(latest_date);
     
      this.api.postPrivate('user/edit-profile', this.form.value).subscribe({
        next: (data) => {
          this.spinner.hide();
          if (data.code === 200) {
            this.getUserDataApi('editProfile');
            this.toastr.success(this.status.PROFILE_UPDATE_SUCCESS.name);
          }
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        },
      });
    }
  }

  // Reset Password Submit API
  resetPwdSubmit() {
    this.spinner.show();
    this.resetSubmitted = true;
    if (this.resetPassword.invalid) {
      this.spinner.hide();
      return;
    }
    var obj = {
      password: this.resetPassword.value.currentPwd,
      newPassword: this.resetPassword.value.newPwd,
    };
    this.api.postPrivate('user/change-password-user', obj).subscribe({
      next: (data) => {
        this.spinner.hide();
        if (data.code === 200) {
          this.resetPassword.reset();
          this.resetSubmitted = false;
          this.toastr.success(data.msg);
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get resetValidation(): { [key: string]: AbstractControl } {
    return this.resetPassword.controls;
  }

  openDailog() {
    this.activeModal = this.modalService.open(DialogBoxComponent, {
      centered: true,
    });
    this.activeModal.componentInstance.title = this.bulkData.title;
    this.activeModal.componentInstance.description = this.bulkData.description;
    this.activeModal.componentInstance.button = this.bulkData.button;
    console.log(this.activeModal.componentInstance.button,'111')
  }

  logout() {
    this.bulkData = this.logoutData;
    console.log(this.bulkData);
    this.openDailog();
    this.activeModal.result.then(
      (close: any) => {
        this.spinner.show();
        sessionStorage.clear();
        localStorage.removeItem('userInfo');
        localStorage.removeItem('_jwt');
        this.cookieService.deleteAll('');
        this._router.navigateByUrl('/login');
        this.toastr.success(this.status.LOGOUT.name);
        this.spinner.hide();
      },
      (data: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(data)}`;
      }
    );
  }

  close() {
    this.bulkData = this.closeData;
    this.openDailog();
    this.activeModal.result.then(
      (close: any) => {
        this.api.getPrivate('user/delete-account').subscribe({
          next: (data) => {
            if (data.code === 200) {
              this.toastr.success(data.msg);
              sessionStorage.clear();
              localStorage.removeItem('userInfo');
              localStorage.removeItem('_jwt');
              this._router.navigateByUrl('/login');
              this.spinner.hide();
            }
            this.spinner.hide();
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error);
          },
        });
      },
      (data: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(data)}`;
      }
    );
  }

  reset() {
    this.bulkData = this.resetData;
    this.openDailog();
    this.activeModal.result.then(
      (close: any) => {
        this.api.getPrivate('user/reset-account').subscribe({
          next: (data) => {
            if (data.code === 200) {
              this.toastr.success(data.msg);
              sessionStorage.clear();
              localStorage.removeItem('userInfo');
              localStorage.removeItem('_jwt');
              this._router.navigateByUrl('/login');
              this.spinner.hide();
            }
            this.spinner.hide();
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error);
          },
        });
      },
      (data: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(data)}`;
      }
    );
  }

  getBrawlHistory() {
    this.spinner.show();
    this.api
      .getPrivateTime(
        'brawls/get-brawl-history/' +
          this.HistoryDate +
          '/' +
          this.HistoryType +
          '/' +
          this.pageHistory
      )
      .subscribe({
        next: (data) => {
          if (data.code === 200) {
            this.brawlHistoryData = data.data.data;
            if (this.brawlHistoryData?.length == 0) {
              this.historyfilter = false;
            } else {
              this.historyfilter = true;
            }
            this.collectionSizeHistory = data.data.count * 10;
          }
          this.spinner.hide();
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error);
        },
      });
  }

  showDetailResult(id: any) {
    this._router.navigate(['/my-brawls/' + id]);
  }

  brawlHistoryDataChange(event: any, dataType: any) {
    this.collectionSizeHistory = 10;
    this.collectionSizeTransaction = 20;
    var value = event.target.value;
    var valueSplit = value.split(' ');
    var date = valueSplit[0];
    var type = valueSplit[1];
    if (dataType == 'transaction') {
      this.transactionDate = parseInt(date);
      this.transactionType = type;
      this.getTransactionHistory();
    } else if (dataType == 'history') {
      this.HistoryDate = parseInt(date);
      this.HistoryType = type;
      this.getBrawlHistory();
    }
  }

  getTransactionHistory() {
    this.spinner.show();
    var obj = {
      type: this.transactionType,
      day: this.transactionDate,
      page: this.page,
    };

    this.api.postPrivate('account/get-transaction', obj).subscribe({
      next: (data) => {
        if (data.code === 200) {
          this.brawlTransactionData = data.data;
          this.collectionSizeTransaction = data.data.total * 20;
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  open(event: any) {
    var type_ = event.target.id;
    if (type_ == 1) {
      // 1 = logout
      this.logout();
    } else if (type_ == 2) {
      // 2 = close
      this.close();
    } else if (type_ == 3) {
      // 3 = reset
      this.reset();
    }
  }

  private getDismissReason(reason: any): string {
    this.activeModal = this.modalService.dismissAll('Close');
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  copyRefralLink(referralLink: any) {
    this._clipboardService.copy(
      this.domainAndApp + '/register?code=' + referralLink
    );
    this.toastr.success(this.status.REFERRAL_LINK.name);
  }

  hideShowPassCurr(passwordName: any, type: any): void {
    var newData = this.listClass.hideShowPass(passwordName, type);
    if (newData.type == 'current-password') {
      this.showCurr = newData.show;
      this.passwordCurr = newData.passString;
    } else if (newData.type == 'new-password') {
      this.show = newData.show;
      this.passwordNew = newData.passString;
    } else {
      this.showCon = newData.show;
      this.passwordConf = newData.passString;
    }
  }

  beltsBuy() {
    if (this.selectBadges == undefined) {
      this.toastr.error(this.status.BADGES_NOT_SELECT.name);
      return;
    }
    this.spinner.show();
    let obj = {
      amountTotal: '1.99',
      itemsName: this.selectBadges.name,
      itemsId: this.selectBadges._id,
      quantity: 1,
      item_type: 'badges',
    };
    this.clickpaypal(obj);
  }

  buddyBucksBuy() {
    this.spinner.show();
    let obj = {
      amountTotal: this.buddyBucks[this.selectbucks].value,
      itemsName: this.buddyBucks[this.selectbucks].buddybucks,
      itemsId: this.buddyBucks[this.selectbucks].buddybucks,
      quantity: 1,
      item_type: 'bucks',
    };
    this.clickpaypal(obj);
  }

  selectbucksEntry(data: any) {
    this.selectbucks = data;
  }

  clickpaypal(obj: any) {
    this.api.postPrivate('payments/click-paypal', obj).subscribe({
      next: (data) => {
        if (data.code === 200) {
          var win = window.open(data.data);
          var timer = setInterval(() => {
            if (win.closed) {
              clearInterval(timer);
              this._document.defaultView.location.reload();
              this.spinner.hide();
              if (obj.item_type == 'badges') {
                this._router.navigateByUrl('/account/badges').then(() => {
                  window.location.reload();
                });
              }

              if (obj.item_type == 'bucks') {
                this.active = 'buddyBucks';
              }
            }
          }, 1000);
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }

  transformDate(data: any) {
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix;
  }

  transHistoryformDate(data: any) {
    var dateFix = this.timeFormat.timeBrawlsTransaction(data);
    return dateFix;
  }

  getbelts() {
    this.scroll();
    // this.spinner.show();
    // this.api.getPrivate('account/my-belts').subscribe({
    //   next: (data) => {
    //     this.spinner.hide();
    //     if (data.code === 200) {
    //       this.beltsInfo = data.data;
    //     }
    //   },
    //   error: (err) => {
    //     this.spinner.hide();
    //     this.toastr.error(err.error.error);
    //   },
    // });
  }

  creditbadges() {
    if(this.selectBadges == undefined){
      this.toastr.error(this.status.BADGES_NOT_SELECT.name);
      return
    }
    let obj = {
      badgeId: this.selectBadges._id,
    };
    this.spinner.show();
    this.api.postPrivate('user/add-credit-badges', obj).subscribe({
      next: (data) => {
        if(data.code === 200){
          this.toastr.success(this.status.CREDIT_BADGES_SUCCESS.name);
          this._router.navigateByUrl('/account/badges').then(() => {
            window.location.reload();
          });
        }
        this.spinner.hide();
      },
      error: (err) => {
        this.spinner.hide();
        this.toastr.error(err.error.error);
      },
    });
  }
}
