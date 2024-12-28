import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';

import { AccessoryDetail } from 'src/app/core/models/accessory-details.model';
import { AccessoryLayout } from 'src/app/core/models/accessory-layout.model';
import { selectFilteredLayouts, selectHomeAccessories } from 'src/app/core/state/home.selectors';


@Component({
  selector: 'home-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomComponent {
  private readonly route = inject(ActivatedRoute);  
  private readonly store = inject(Store);

  roomName$: Observable<string> = this.route.queryParams.pipe(
    map((params) => params['name'])
  );

  roomLayout$: Observable<AccessoryLayout | undefined> = this.roomName$.pipe(
    switchMap(roomName => {
      return this.store.select(selectFilteredLayouts(roomName))
    })
  );

  roomServices$: Observable<AccessoryDetail[]> = this.roomLayout$.pipe(
    switchMap(roomLayout => {
      if (!roomLayout || !roomLayout.services) {
        return [];
      }
      return this.store.select(selectHomeAccessories).pipe(
        map(accessoryDetails =>
          roomLayout.services
            .map(service => accessoryDetails.filter(detail => detail.uuid === service.uuid))
            .reduce((acc, val) => acc.concat(val), [])
        )
      );
    })
  )
}
