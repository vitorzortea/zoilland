import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DatasService } from '../core/datas.service';
import { HttpService } from './http.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private router: Router,
    private api: HttpService,
    private user: UserService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if(!token){
      return this.router.navigate(['/auth']);
    }
    this.user.get();
    return true;
  }
}
