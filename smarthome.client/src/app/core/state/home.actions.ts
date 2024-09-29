import { createAction, props } from '@ngrx/store';
import { AccessoryLayout } from '../models/accessory-layout.model';
import { AccessoryDetail, Characteristic } from '../models/accessory-details.model';
import { User } from '../models/user.model';

export const loadLayout = createAction('[Dashboard page] Load layout');

export const loadAccessories = createAction('[Room page] Load accessories');

export const loadUser = createAction('[Dashboard page] Load user');


export const loadLayoutSuccess = createAction(
    '[Home API] Layout Load Success',
    props<{ layout: AccessoryLayout[] }>()
);

export const loadLayoutFailure = createAction(
    '[Home API] Layout Load Failure',
    props<{ error: string }>()
);

export const loadAccessoriesSuccess = createAction(
    '[Home API] Accessories Load Success',
    props<{ accessories: AccessoryDetail[] }>()
);

export const loadAccessoriesFailure = createAction(
    '[Home API] Accessories Load Failure',
    props<{ error: string }>()
);

export const loadUserSuccess = createAction(
    '[Home API] User Load Success',
    props<{ user: User }>()
);

export const loadUserFailure = createAction(
    '[Home API] User Load Failure',
    props<{ error: string }>()
);

export const updateAccessory = createAction(
    '[Accessory] Update Accessory',
    props<{ serviceId: any, property: Characteristic }>()
);