import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

import { RoomComponent } from './components/acessory-list/room.component';
import { RoomRoutingModule } from './room-routing.module';
import { AccessoryComponent } from './components/accessory/accessory.component';


@NgModule({
  declarations: [
    RoomComponent,
    AccessoryComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    InputSwitchModule
  ]
})
export class RoomModule { }
