import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-how-to-paly-accordion',
  templateUrl: './how-to-paly-accordion.component.html',
  styleUrls: ['./how-to-paly-accordion.component.css']
})
export class HowToPalyAccordionComponent implements OnInit {

  constructor() {}
  @Input() hiwData : any;
 
  ngOnInit(): void {    
  }

}
