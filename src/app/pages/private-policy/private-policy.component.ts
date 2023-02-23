import { Component, OnInit , Input} from '@angular/core';
import { ClassList } from '../../service/validation/classList'
import { ApiService }from "../../service/api.service";

@Component({
  selector: 'app-private-policy',
  templateUrl: './private-policy.component.html',
  styleUrls: ['./private-policy.component.css']
})
export class PrivatePolicyComponent implements OnInit {
  title_ : any = "PRIVACY POLICY"
  content_ : any ;
  constructor(
    private listClass : ClassList,
    private api : ApiService,
  ) { 
    this.listClass.add('app-private-policy') ;
  }

  ngOnInit(): void {
    this.policy()
  }

  ngOnDestroy() {
    this.listClass.destroy('app-private-policy') ;
  }


  policy(){
    this.api.getPrivate('user/page/privacy-policy').subscribe({
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
