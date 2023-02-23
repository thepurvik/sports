import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceProvider } from '../../service/validation/toaster'
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-pay-out',
  templateUrl: './pay-out.component.html',
  styleUrls: ['./pay-out.component.css']
})
export class PayOutComponent implements OnInit {
  id:any;
  payOutData: any;

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrServiceProvider,
  ) {
    if(this.route.snapshot.paramMap.get('id')){
      this.id = this.route.snapshot.paramMap.get('id')
    }
   }

  ngOnInit(): void {
    this.getPayOutApi();
  }

  getPayOutApi(){
    this.spinner.show();
    this.api.getPrivateTime('brawls/brawl-detail/' + this.id).subscribe({
      next: async (data) => {
        if (data.code === 200) {
          this.payOutData = data?.data?.payout;
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
