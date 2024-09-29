import { Routes } from '@angular/router';
import { layoutResolver } from './core/resolvers/layout.resolver';
import { accessoryResolver } from './core/resolvers/accessory.resolver';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(mod => mod.DashboardModule),
    resolve: { layoutResolver,  }
  },
  {
    path: 'room',
    loadChildren: () => import('./features/room/room.module').then(mod => mod.RoomModule),
    resolve: { layoutResolver, accessoryResolver }
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
