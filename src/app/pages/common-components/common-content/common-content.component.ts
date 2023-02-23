import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.css']
})
export class CommonContentComponent implements OnInit {
  @Input() content : string ;
  constructor() { }

  ngOnInit(): void {    
  }

}
