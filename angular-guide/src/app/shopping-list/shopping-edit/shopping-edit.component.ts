import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.action';
import { AppState } from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  editMode = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;
  @ViewChild('f', { static: false }) form: NgForm;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedIngredient = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount,
      });
    });
  }

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const newIngredient = new Ingredient(name, amount);

    if (this.editMode) {
      // this.shoppingListService.updateIngredients(
      //   this.editedItemIndex,
      //   newIngredient
      // );
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredients({
          index: this.editedItemIndex,
          ingredient: newIngredient,
        })
      );
    }
    // else this.shoppingListService.addIngredient(newIngredient);
    else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredients(this.editedItemIndex)
    );
    this.onClear();
    // this.shoppingListService.deleteIngredients(this.editedItemIndex);
  }
}
