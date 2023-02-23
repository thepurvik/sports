import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-common-title',
  templateUrl: './common-title.component.html',
  styleUrls: ['./common-title.component.css']
})
export class CommonTitleComponent implements OnInit {
  @Input() title : any;
  constructor() { }

  ngOnInit(): void {
  }

}
