import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) =>
        this.http.get<Recipe[]>(
          'https://ng-guilde-complete-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          {
            params: new HttpParams().set('auth', user.token),
          }
        )
      ),
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
    );
  }
}
