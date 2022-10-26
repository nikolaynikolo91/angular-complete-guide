import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddItem(form: NgForm) {
    const { name, amount } = form.value;
    const newIngredient = new Ingredient(name, amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
