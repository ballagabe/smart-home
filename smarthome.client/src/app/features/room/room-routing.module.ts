import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { AccessoryComponent } from './components/accessory/accessory.component';
import { accessoryResolver } from 'src/app/core/resolvers/accessory.resolver';

const routes: Routes = [
  {
    path: '',
    component: RoomComponent
  },
  {
    path: 'accessory',
    component: AccessoryComponent,
    resolve: accessoryResolver
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
