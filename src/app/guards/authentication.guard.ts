import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../service/auth-guard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private authService: AuthGuardService ,
    private router: Router,
    public cookieService: CookieService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {        
    if (!this.authService.LoginStatus) {  
      this.cookieService.deleteAll('');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('_jwt');
      this.router.navigate(['login']);
    }
    this.authService.httpHeader
    return this.authService.LoginStatus;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {    
    return this.canActivate(route, state);
  }
  
}
