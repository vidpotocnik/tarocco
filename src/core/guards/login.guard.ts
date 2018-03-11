import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      /*
        let result = true;
        if (this.userService.getAuthorizationStatus() === '1') {
            result = false;
        }

        if (!result) {
            this.router.navigate(['']);
        }

        return result;
        */
      return true;
    }
}
