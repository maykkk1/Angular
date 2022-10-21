import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/Ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    selectedRecipe = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            0,
            'Whopper',
            'Icônico para todo mundo!',
            '../../assets/images/receitas/whopper-thumb.png', 
            [
                new Ingredient('meat', 1),
                new Ingredient('onion', 5),
                new Ingredient('cheese', 2)
            ]),
        new Recipe(
            1,
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

    getRecipeById(id: number) {
        const index = this.getRecipes().findIndex(recipe => recipe.id == id)
        return this.getRecipes()[index]
    }
}