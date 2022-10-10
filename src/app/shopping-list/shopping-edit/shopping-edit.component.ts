import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientName') ingName:ElementRef;
  @ViewChild('ingredientAmount') ingAmount:ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient() {
    const name = this.ingName.nativeElement.value
    const amount = this.ingAmount.nativeElement.value
    const ingredient = new Ingredient(name, amount)
    this.shoppingListService.addIngredients(ingredient); 
  }

}
