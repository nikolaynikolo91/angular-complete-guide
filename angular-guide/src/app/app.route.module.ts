import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AppRouterModule {}
