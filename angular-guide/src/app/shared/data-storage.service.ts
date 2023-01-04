import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-guilde-complete-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe((recipes) => {
        console.log(recipes);
      });
  }

  fetchRecipesData() {
   return this.http
      .get<Recipe[]>(
        'https://ng-guilde-complete-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      )

  }
}
