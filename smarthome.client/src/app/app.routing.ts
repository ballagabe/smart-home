import { Routes } from '@angular/router';
import { layoutResolver } from './core/resolvers/layout.resolver';
import { accessoryResolver } from './core/resolvers/accessory.resolver';
import { userResolver } from './core/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    resolve: { layoutResolver, userResolver }
  },
  {
    path: 'room',
    loadChildren: () => import('./features/room/room.module').then(mod => mod.RoomModule),
    resolve: { layoutResolver, accessoryResolver, userResolver }
  },
  {
    path: 'settings',
    loadChildren: () => import('./features/settings/settings.module').then(mod => mod.SettingsModule)
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  }
];
