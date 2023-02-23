import { Component, OnInit , Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root' // just before your class
})
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  @Input() title : any;
  @Input() description : any;
  @Input() button : any;
  constructor(
    private modalService: NgbModal,
    public modal: NgbActiveModal
  ) { 
    
  }
  ngOnInit(): void {
  }
}
