import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeData: Recipe;
  recipeId: number;

  constructor(private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router
            ) { }

  ngOnInit(): void {
    this.recipeId = +this.route.snapshot.params['id']
    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipeId = +params['id']
          this.recipeData = this.recipeService.getRecipeById(this.recipeId)
        }
      )
  }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeData.ingridients);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['recipes'])
  }

}
