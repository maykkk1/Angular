import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    selectedRecipe = new Subject<Recipe>();
    recipeChanged = new Subject<void>();
    private recipes: Recipe[] = [
        new Recipe(
            'Whopper',
            'Icônico para todo mundo!',
            '../../assets/images/receitas/whopper-thumb.png', 
            [
                new Ingredient('meat', 1),
                new Ingredient('onion', 5),
                new Ingredient('cheese', 2)
            ]),
        new Recipe(
            'CBK', 
            'Novo sanduíche feito com peito de frango empanado.', 
            '../../assets/images/receitas/CBK-thumb-cupom-m-d.png',
            [
                new Ingredient('meat', 1),
                new Ingredient('onion', 5),
                new Ingredient('cheese', 2)
            ])
      ];

    
    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredientsList(ingredients);
    }

    getRecipeById(index: number) {
        return this.getRecipes()[index]
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next();
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next();
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1)
        this.recipeChanged.next();
    }
}