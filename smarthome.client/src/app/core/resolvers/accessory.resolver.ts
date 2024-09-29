import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, first, tap } from 'rxjs';
import { inject } from '@angular/core';
import { selectHomeAccessoriesLoaded } from '../state/home.selectors';
import { loadAccessories } from '../state/home.actions';

export const accessoryResolver: ResolveFn<boolean> = (
) => {
  const store = inject(Store);
  return store.pipe(
    select(selectHomeAccessoriesLoaded),
    tap(loaded => {
      if (!loaded) {
        store.dispatch(loadAccessories());
      }
    }),
    filter(loaded => loaded),
    first()
  );
};