import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, first, tap } from 'rxjs';
import { inject } from '@angular/core';
import { selectHomeUserLoaded } from '../state/home.selectors';
import { loadUser } from '../state/home.actions';

export const userResolver: ResolveFn<boolean> = (
) => {
  const store = inject(Store);
  return store.pipe(
    select(selectHomeUserLoaded),
    tap(loaded => {
      if (!loaded) {
        store.dispatch(loadUser());
      }
    }),
    filter(loaded => loaded),
    first()
  );
};