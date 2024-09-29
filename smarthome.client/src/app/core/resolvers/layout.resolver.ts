import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, first, tap } from 'rxjs';
import { inject } from '@angular/core';
import { selectHomeLayoutLoaded } from '../state/home.selectors';
import { loadLayout } from '../state/home.actions';

export const layoutResolver: ResolveFn<boolean> = (
) => {
  const store = inject(Store);
  return store.pipe(
    select(selectHomeLayoutLoaded),
    tap(loaded => {
      if (!loaded) {
        store.dispatch(loadLayout());
      }
    }),
    filter(loaded => loaded),
    first()
  );
};