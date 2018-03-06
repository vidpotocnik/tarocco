import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  public handleError(error: HttpErrorResponse): void {
    console.log(error);
  }
}
