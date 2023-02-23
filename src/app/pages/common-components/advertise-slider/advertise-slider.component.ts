import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ApiService }from "../../../service/api.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-advertise-slider',
  templateUrl: './advertise-slider.component.html',
  styleUrls: ['./advertise-slider.component.css'],
  providers: [NgbCarouselConfig]
})
export class AdvertiseSliderComponent implements OnInit {

  // showNavigationArrows = false;
  // showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig,
    private api : ApiService,
    private spinner: NgxSpinnerService,

    ) {
    // config.showNavigationArrows = false;
    // config.showNavigationIndicators = true;
  }

  slideInfo: any = [];
  ngOnInit(): void {
    this.loasAds()
  }


  loasAds(){
    this.api.getPrivate('user/advertisement-list').subscribe({
      next:data =>{
        if(data.code === 200){  
          this.slideInfo = data.data
        }
        
      },
      error:err=>{
      }
    })
  }

}
