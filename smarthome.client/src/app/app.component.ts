import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem } from './core/models/menu-item-model';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import { Store } from '@ngrx/store';
import { selectHomeUser } from './core/state/home.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  store = inject(Store);
  
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home' , routerLink: '/' },
    { label: 'Settings', icon: 'pi pi-cog' , routerLink: '/settings/app' }
  ];

  user$: Observable<User> = this.store.select(selectHomeUser);
}