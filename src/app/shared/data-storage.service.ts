import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs";
import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-course-recipe-book-b88db-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response)
            });
    }


    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-b88db-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingridients: recipe.ingridients ? recipe.ingridients : []}
                });
            }), 
            tap(recipes => {
                this.recipesService.setRecipes(recipes);
            })
            )
    }
    
}