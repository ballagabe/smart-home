import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  constructor(http: HttpClient, private oauthService: OAuthService) {
    super(http);
  }

  logout(): void {
    this.oauthService.revokeTokenAndLogout();
    window.location.href = '/';
  }

  getGoogleUserInfo(): Observable<any> {
    return from(this.oauthService.loadUserProfile()).pipe(
      map((response: any) => response.info)
    );
  }
}