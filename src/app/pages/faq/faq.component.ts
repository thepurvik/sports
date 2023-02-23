import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { ApiService }from "../../service/api.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(    
    private listClass : ClassList,
    private spinner: NgxSpinnerService,
    private api : ApiService,

  ) { 
    this.listClass.add('app-faq') ;
  }
  title_ : any = "FAQ";
  faqData: any = [];

  ngOnInit(): void {
    this.loasFaq();
  }


  ngOnDestroy() {
    this.listClass.destroy('app-faq') ;
  }


  loasFaq(){
    this.spinner.show();
    this.api.getPrivate('user/faq-list').subscribe({
      next:data =>{
        this.spinner.hide();
        if(data.code === 200){  
          this.faqData = data.data
        }
        
      },
      error:err=>{
        this.spinner.hide();
      }
    })
  }
}
