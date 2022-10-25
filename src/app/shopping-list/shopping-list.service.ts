
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice()
    }

    getIngrident(index: number) {
        return this.ingredients[index];
    }

    addIngredients(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsList(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients)
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredients(index: number) {
        this.ingredients.splice(index, 1)
        this.ingredientsChanged.next(this.ingredients.slice())
    }

}