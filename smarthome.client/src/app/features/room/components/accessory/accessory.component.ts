import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, map, switchMap } from 'rxjs';
import { Location } from '@angular/common';

import { AccessoryDetail, Characteristic } from 'src/app/core/models/accessory-details.model';
import { AccessoryService } from 'src/app/core/services/accessory.service';

@Component({
  selector: 'home-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.scss']
})
export class AccessoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly accessoryService = inject(AccessoryService);
  private readonly location = inject(Location)

  accessoryId$: Observable<string> = this.route.queryParams.pipe(
    map((params) => params['uid'])
  );

  accessory$: Observable<AccessoryDetail | null> = this.accessoryId$.pipe(
    switchMap(uniqueId => {
      return this.accessoryService.getFilteredAccessoryDetails(uniqueId);
    })
  );

  updateAccessory(accessoryProperties: Characteristic) {
    this.accessoryId$
      .pipe(
        switchMap(accessoryId => this.accessoryService.updateAccessoryCharacteristic(accessoryId, accessoryProperties))
      )
      .subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  toBoolean(value: number): any {
    return value === 1;
  }
}
