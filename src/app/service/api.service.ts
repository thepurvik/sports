import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import { LocalstorageService}  from './localstorage.service'
import { HeaderSet } from './header.service';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private storageService : LocalstorageService,
    private headerLoad: HeaderSet
  ) { 
    this.headerLoad    
  }

  // Post Api with Header Auth
  postPrivate(url:any, data_:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.session
    return this.http.post(environment.api+url,data_,httpHeaders);
  }

  // Post Api without Header Auth
  postPublic(url:any, data_:any):Observable<any> {
    return this.http.post(environment.api+url,data_);
  }

  // get Api without Header Auth
  getPublic(url:any):Observable<any> {
    return this.http.get(environment.api+url);
  }

  // Post Api with Header Auth Session
  postSession(url:any, data_:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.session;
    return this.http.post(environment.api+url,data_,httpHeaders);
  }


  // Get Api with Header Auth
  getPrivate(url:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.session;
    return this.http.get(environment.api+url,httpHeaders);
  }
  getPrivatWithData(url:any,data:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.session;
    return this.http.get(environment.api+url+data,httpHeaders);
  }

  getPrivateTime(url:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.sessionWithTime;    
    return this.http.get(environment.api+url,httpHeaders);
  }

  PostPrivateTime(url:any,data_:any):Observable<any> {
    const httpHeaders:any =  this.headerLoad.sessionWithTime;    
    return this.http.post(environment.api+url,data_,httpHeaders);
  }
}
