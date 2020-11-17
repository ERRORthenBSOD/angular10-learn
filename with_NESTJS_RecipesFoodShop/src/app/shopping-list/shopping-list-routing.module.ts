import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingListRoutes: Routes = [
  { path: '', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(shoppingListRoutes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
