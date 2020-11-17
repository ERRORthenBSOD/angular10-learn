import { Actions, Effect, ofType } from '@ngrx/effects';
import * as RecipesActions from './recipes.actions';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get(
        'https://angular10udemy.firebaseio.com/recipes.json'
      );
    }),
    map((recipes: Recipe[]) => {
      return recipes.map((r) => {
        return {
          ...r,
          ingredients: r.ingredients ? r.ingredients : [],
        };
      });
    }),
    map((recipes) => new RecipesActions.SetRecipes(recipes))
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://angular10udemy.firebaseio.com/recipes.json',
        recipesState.recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
