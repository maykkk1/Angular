import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  editedItemId: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
      private router: ActivatedRoute,
      private recipeService: RecipeService
      ) { }

  ngOnInit(): void {
    this.router.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipeById(params['id'])
          this.editedItemId = +params['id']
          this.editMode = params['id'] != null;
          this.initForm()
        }
      )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.editedItemId)
      recipeName = recipe.name
      recipeImagePath = recipe.imgPath
      recipeDescription = recipe.description
      if(recipe['ingridients']) {
        for(let ingredient of recipe.ingridients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onSubmit() {
    console.log(this.recipeForm.value)
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(),
        'amount': new FormControl()
      })
    )
  }


}
