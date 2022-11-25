import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

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

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToSHoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getSingleRecipe(id: string) {
    return this.getRecipes()[+id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }
}
