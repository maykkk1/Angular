import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editItemIndex = index;
          this.editMode = true;
          this.editItem = this.shoppingListService.getIngrident(index);
          this.slForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          })
        }
      );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredients(ingredient); 
    }
    this.slForm.reset()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearForm() {
    this.slForm.reset()
    this.editMode = false;
    this.editItemIndex = undefined;
    this.editItem = null;
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredients(this.editItemIndex)
    this.clearForm()
  }

}
