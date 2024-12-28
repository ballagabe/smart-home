import { createReducer, on } from '@ngrx/store';

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
import { AppState } from '../models/app-state.model';

export const initialState: AppState = {
  layout: [],
  accessories: [],
  user: { name: '', email: '', picture: '' },
  layoutLoaded: false,
  accessoriesLoaded: false,
  userLoaded: false
};

export const homeReducer = createReducer(
    initialState,
    on(loadLayout, (state) => ({ ...state })),
    on(loadLayoutSuccess, (state, { layout }) => ({ ...state, layout, layoutLoaded: true})),
    on(loadLayoutFailure, (state) => ({ ...state, layoutLoaded: false })),
    on(loadAccessories, (state) => ({ ...state })),
    on(loadAccessoriesSuccess, (state,{ accessories }) => ({ ...state, accessories, accessoriesLoaded: true })),
    on(loadAccessoriesFailure, (state) => ({ ...state, accessoriesLoaded: false })),
    on(loadUser, (state) => ({ ...state })),
    on(loadUserSuccess, (state, { user }) => ({ ...state, user, userLoaded: true})),
    on(loadUserFailure, (state) => ({ ...state, userLoaded: false })),
  );