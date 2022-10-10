import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredientsList(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
    }

}