import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'home-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent {
  authService = inject(AuthService);
}