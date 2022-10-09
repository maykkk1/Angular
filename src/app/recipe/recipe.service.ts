import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Mousse de Maracujá', 'Mousse de maracujá fácil e prática', 'https://img.itdg.com.br/tdg/images/recipes/000/001/599/361922/361922_original.jpg?mode=crop&width=710&height=400'),
        new Recipe('Brigadeiro', 'Aprenda essa receita de brigadeiro de panela deliciosa!', 'https://elle.com.br/media-library/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yNzYzMTA2MS9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTcxMTAyMjY5MX0.79MTbUFzTiuYpy1l4bORV6gHbx4zAnK6piWHW2EqPuU/image.jpg?width=1500&height=2000&quality=85&coordinates=1296%2C0%2C1296%2C0')
      ];


    getRecipes() {
        return this.recipes.slice();
    }
}