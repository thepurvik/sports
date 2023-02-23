import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-restriction',
  templateUrl: './geo-restriction.component.html',
  styleUrls: ['./geo-restriction.component.css']
})
export class GeoRestrictionComponent implements OnInit {

  constructor() {
    localStorage.clear();
    sessionStorage.clear();
   }

  ngOnInit(): void {
  }

}
