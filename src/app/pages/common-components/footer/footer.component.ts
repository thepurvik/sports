import { Component, OnInit } from '@angular/core';
import { ApiService }from "../../../service/api.service";
import { SupportComponent } from '../../support/support.component';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year:any = new Date().getFullYear();
  constructor(
    private api : ApiService,
    public modal: NgbActiveModal,
    private modalService: NgbModal
  ) { }
  activeModal: any;

  ngOnInit(): void {
    // this.getCms()
  }

  getCms(){
    this.api.getPrivate('admin/content/list-pages').subscribe({
      next : data => {
      },
      error: err =>{
      }
    })
  }

  openSupport(){
    this.activeModal = this.modalService.open(SupportComponent, {size:'md'});

  }
}
