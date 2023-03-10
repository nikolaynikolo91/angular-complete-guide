import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientChanges = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
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

  updateIngredients(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientChanges.next(this.ingredients.slice())
  }

  deleteIngredients(index: number){
    this.ingredientChanges.next(this.ingredients.splice(index, 1))
  }
}
