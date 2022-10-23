import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientChanges = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanges.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (const ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientChanges.next(this.ingredients.slice());
  }
}
