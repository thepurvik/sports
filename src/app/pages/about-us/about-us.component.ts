import { Component, OnInit } from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { ApiService }from "../../service/api.service";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  title_ : any = "About Us" ;
  content_ : any 
  constructor(
    private listClass : ClassList,
    private api : ApiService,
  ) {
    this.listClass.add('app-about-us') ;
   }

  ngOnInit(): void {
    this.terms()
  }

  ngOnDestroy() {
    this.listClass.destroy('app-about-us') ;
  }

  terms(){
    this.api.getPrivate('user/page/about-us').subscribe({
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
