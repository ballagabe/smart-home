import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';

import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { homeReducer } from './core/state/home.reducer';
import { HomeEffects } from './core/state/home.effects';
import { AuthGuard } from './core/guards/auth.guard';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authConfig } from './auth.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ home: homeReducer }),
    EffectsModule.forRoot([HomeEffects]),
    MenubarModule,
    AvatarModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard,
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}