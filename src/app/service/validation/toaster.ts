import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class ToastrServiceProvider {
    constructor(
        public toastr: ToastrService
    ) { }

    success(message: any) {
        this.toastr.clear();
        this.toastr.success(message);
    };

    error(message: any) {
        this.toastr.clear();
        this.toastr.error(message);
    };

}