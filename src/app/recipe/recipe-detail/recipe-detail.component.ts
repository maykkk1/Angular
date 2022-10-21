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

  constructor(private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router
            ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.route.params
      .subscribe(
        (params: Params) => {
          id = params['id']
          this.recipeData = this.recipeService.getRecipeById(id)
        }
      )
  }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeData.ingridients);
  }

}
