import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { ApiService }from "../../service/api.service";

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {
  title_ : any = "TERMS & CONDITION" ;
  content_ : any 
  constructor(
    private listClass : ClassList,
    private api : ApiService,
  ) { 
    this.listClass.add('app-terms-condition') ;
  }

  ngOnInit(): void {
    this.terms()
  }

  ngOnDestroy() {
    this.listClass.destroy('app-terms-condition') ;
  }

  terms(){
    this.api.getPrivate('user/page/terms-condition').subscribe({
      next:data =>{
        if(data.code === 200){  
          this.content_ = data.data.content
        }
      },
      error:err=>{
        console.error(err)  
      ;
      }
    })
  }

}
