import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.1001recepti.com/images/photos/recipes/size_5/agneshka-shkembe-chorba-s-priasno-mliako-cherven-piper-chesun-i-ocet-19ad671f19a315487e130c8571bacdc6-[104174].jpg',
      [new Ingredient('Meat', 1), new Ingredient('French fries', 1)]
    ),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://www.1001recepti.com/images/photos/recipes/size_5/agneshka-shkembe-chorba-s-priasno-mliako-cherven-piper-chesun-i-ocet-19ad671f19a315487e130c8571bacdc6-[104174].jpg',
      [new Ingredient('Meat', 2), new Ingredient('Bread', 2)]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
