import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccessoryLayout } from 'src/app/core/models/accessory-layout.model';
import { selectHomeLayout } from 'src/app/core/state/home.selectors';

@Component({
  selector: 'home-dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  store = inject(Store);

  layouts$: Observable<AccessoryLayout[]> = this.store.select(selectHomeLayout);
}
