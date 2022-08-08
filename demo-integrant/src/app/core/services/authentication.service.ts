import { Injectable, Injector } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: string | null;


  constructor(private http: HttpClient, private router: Router, private injector: Injector) {
    this.currentUser = null
  }


  login(username: string) {
    this.currentUser = username;

  }

  logout() {
    this.currentUser = null;
  }

}
