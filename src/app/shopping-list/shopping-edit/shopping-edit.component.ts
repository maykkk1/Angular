import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredientName') ingName:ElementRef;
  @ViewChild('ingredientAmount') ingAmount:ElementRef;

  @Output() onIngredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient() {
    const name = this.ingName.nativeElement.value
    const amount = this.ingAmount.nativeElement.value
    this.onIngredientAdded.emit(new Ingredient(name, amount))
  }

}
