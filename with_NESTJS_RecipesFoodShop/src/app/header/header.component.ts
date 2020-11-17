import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(private store: Store<fromApp.AppState>) {}
  collapsed = true;

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe(({ user }) => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }
  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
