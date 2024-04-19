import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DatashareService } from '../services/dataservice/datashare.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private router: Router, private dataService:  DatashareService) {}

  AuthGuardFunction(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    var isAuthenticated = false;
    this.dataService.loginData.subscribe({
      next: (data) => {
        if (data !== null && data !== "") {
          isAuthenticated = true;
        } else {
          isAuthenticated = false;
        }
      },
    });
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (next:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  return inject(AuthguardService).AuthGuardFunction(next, state);
};
