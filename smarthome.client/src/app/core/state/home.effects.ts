import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import {
    loadLayout,
    loadAccessories,
    loadAccessoriesSuccess,
    loadLayoutSuccess,
    loadLayoutFailure,
    loadAccessoriesFailure,
    loadUser,
    loadUserSuccess,
    loadUserFailure
} from './home.actions';
import { AccessoryService } from '../services/accessory.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HomeEffects {
    actions$ = inject(Actions);
    accessoryService = inject(AccessoryService);
    authService = inject(AuthService);
    
    loadLayout$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadLayout),
        switchMap(() =>
        from(this.accessoryService.getLayouts()).pipe(
            map(layout => loadLayoutSuccess({ layout })),
            catchError((error) => of(loadLayoutFailure({ error })))
        )))
    );

    loadAccessories$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadAccessories),
        switchMap(() =>
        from(this.accessoryService.getAllAccessoryDetails()).pipe(
            map((accessories) => loadAccessoriesSuccess({ accessories : accessories })),
            catchError((error) => of(loadAccessoriesFailure({ error })))
        )))
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(() =>
            from(this.authService.getGoogleUserInfo()).pipe(
                map((user) => loadUserSuccess({ user : user })),
                catchError((error) => of(loadUserFailure({ error })))
            )))
        );
}