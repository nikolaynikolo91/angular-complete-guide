import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;       
    });
  }

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
