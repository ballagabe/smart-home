import { createFeature, createSelector } from '@ngrx/store';
import { homeReducer } from './home.reducer';

export const homeFeature = createFeature({
  name: 'home',
  reducer: homeReducer
});
  
export const {
  selectLayout: selectHomeLayout,
  selectAccessories: selectHomeAccessories,
  selectLayoutLoaded: selectHomeLayoutLoaded,
  selectAccessoriesLoaded: selectHomeAccessoriesLoaded,
  selectUser: selectHomeUser,
  selectUserLoaded: selectHomeUserLoaded
} = homeFeature;

export const selectFilteredAccessories = (uniqueId: string) => createSelector(
  selectHomeAccessories,
  (accessories) => accessories.find(accessory => accessory.uniqueId === uniqueId)
);

export const selectFilteredLayouts = (layoutName: string) => createSelector(
  selectHomeLayout,
  (layouts) => layouts.find(layout => layout.name === layoutName)
);