import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  ingredientChanged: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChanged = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredient: Ingredient[]) => {
          this.ingredients = ingredient;
        }
      )
  }

  ngOnDestroy(): void {
    this.ingredientChanged.unsubscribe()
  }
}
