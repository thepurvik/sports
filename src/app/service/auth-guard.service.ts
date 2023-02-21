import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService}  from './localstorage.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  httpHeaders : any ;
  currentCountry : any = null;
  constructor(
    private http: HttpClient,
    private storageService : LocalstorageService ,
    public cookieService: CookieService
  ) {
    this.httpHeader
  }

  get LoginStatus() {       
    const current = new Date();
    const CurrentTimestamp = current.getTime();     
    if(new Date(CurrentTimestamp) < new Date(Number(this.cookieService.get('userExpire')))){
      if(localStorage.getItem('userInfo')){
        return true
      }else{        
        return false;
      }
    }else{
      return false;
    }
  }

  getPublic():Observable<any> {
    return this.http.get("https://ipapi.co/json/");
  }


  get httpHeader(){
    if(localStorage.getItem('userInfo')){
      var data = this.storageService.getItem('_jwt');
      return this.httpHeaders = { headers: new HttpHeaders({'Authorization': data})}
    }else{
     return false
    }
  };  

  Authorization(token:any){
    return this.httpHeaders = { headers: new HttpHeaders({'Authorization': token})}
  }

}
