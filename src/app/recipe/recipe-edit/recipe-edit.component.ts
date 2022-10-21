import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode = false;

  constructor(
      private router: ActivatedRoute,
      private recipeService: RecipeService
      ) { }

  ngOnInit(): void {
    this.router.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipeById(params['id'])
          this.editMode = params['id'] != null;
          console.log(this.editMode)
        }
      )
  }

}
