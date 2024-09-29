import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http-service.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  private isAuthenticatedFlag = false;

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticatedFlag = false;
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag || !!localStorage.getItem('access_token');
  }

  getUserInformations(): Observable<User> {
    return this.get<User>(`api/user`);
  }
}