import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://www.1001recepti.com/images/photos/recipes/size_5/agneshka-shkembe-chorba-s-priasno-mliako-cherven-piper-chesun-i-ocet-19ad671f19a315487e130c8571bacdc6-[104174].jpg'
    ),
    new Recipe(
      'A Test Recipe2',
      'This is simply a test2',
      'https://www.1001recepti.com/images/photos/recipes/size_5/agneshka-shkembe-chorba-s-priasno-mliako-cherven-piper-chesun-i-ocet-19ad671f19a315487e130c8571bacdc6-[104174].jpg'
    ),
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  onRecipeClicked(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
