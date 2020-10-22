import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  // canactivate is a interface

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authservice.isUserLoggeIn()) {
      return true;
    }
    this.router.navigate(['system/login']);
    return false;
  }
}
