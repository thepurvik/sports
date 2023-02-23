import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrServiceProvider } from '../../../service/validation/toaster'
import { TimeFormat } from 'src/app/service/validation/timeformat';
@Component({
  selector: 'app-contest-card',
  templateUrl: './contest-card.component.html',
  styleUrls: ['./contest-card.component.css']
})
export class ContestCardComponent implements OnInit {

  constructor(
    private route:Router,
    private timeFormat:TimeFormat,
    public toastr: ToastrServiceProvider,
    ) { }
  @Input() contestData : any;
  @Input() entered: any;
  date3:string
  ngOnInit(): void {      
  }

  payBuddyBucks(data: any) {
    if(this.entered === 'entered'){
      this.route.navigate(['/my-brawls/' + data.entryId]);
    } else {
      if(data.total_enter != data.totalentry){
        this.route.navigate(['/brawls-details/' + data._id]);
      } else {
        this.toastr.error("Brawl is full");
      }
    }
  }

  transformDate(data:any){
    var dateFix = this.timeFormat.timeBrawls(data);
    return dateFix
  }

  navigateToInfo(data: any){
   this.route.navigate(['/pay-out/'+data._id]);
  }

  invite(data:any){
    this.route.navigate(['/invite-brawl/'+data]);
  }
}
