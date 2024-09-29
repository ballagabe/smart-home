import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';
@NgModule({
  declarations: [
    AccountSettingsComponent,
    AppSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
