import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { AppSettingsComponent } from './components/app-settings/app-settings.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountSettingsComponent
  },
  {
    path: 'app',
    component: AppSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
