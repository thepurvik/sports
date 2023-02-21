import { Injectable } from '@angular/core';
const body = document.getElementsByTagName('body')[0]

@Injectable({
    providedIn: 'root'
})


export class ClassList {
    showCurr: boolean;
    constructor() { }
    add(class_: string) {
        body.classList.add(class_);
    }

    destroy(class_: string) {
        body.classList.remove(class_);
    }

    hideShowPass(passString: string, type: string) {
        if (passString === 'password') {
            passString = 'text';
            this.showCurr = true;
        } else {
            passString = 'password';
            this.showCurr = false;
        }
        var obj = {
            type: type,
            passString: passString,
            show: this.showCurr
        }
        return obj;
    }
} 