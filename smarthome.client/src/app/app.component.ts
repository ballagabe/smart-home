import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from './core/models/menu-item-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('access_token', token);
      window.history.replaceState({}, document.title, '/');
    }
  }

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' , routerLink: '/' },
    { label: 'Settings', icon: 'pi pi-cog' , routerLink: '/settings/app' }
  ];
}
