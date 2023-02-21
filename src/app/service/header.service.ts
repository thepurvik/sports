import { Injectable } from '@angular/core';
import { LocalstorageService}  from './localstorage.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HeaderSet {
    httpHeaderset : any
    httpHeadersetTime : any
    constructor(
        private storageService : LocalstorageService
    ) {        
        this.loadHeader();
        this.headerWithTime();
     }

    async loadHeader(){
        if(localStorage.getItem('userInfo')){
            var data = this.storageService.getItem('_jwt');
            return this.httpHeaderset = { headers: new HttpHeaders({'Authorization': data})}
          }else{
           return false
        }
    }

    async Authorization(token:any){
        return this.httpHeaderset = { headers: new HttpHeaders({'Authorization': token})}
    }

    get session(){
        return this.httpHeaderset
    }
    

    headerWithTime(){
        if(localStorage.getItem('userInfo')){
            var data = this.storageService.getItem('_jwt');
            return this.httpHeadersetTime = { headers: new HttpHeaders({'authorization': data , 'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone})}
          }else{
           return false
        }
    }

    get sessionWithTime(){
        return this.httpHeadersetTime
    }

}