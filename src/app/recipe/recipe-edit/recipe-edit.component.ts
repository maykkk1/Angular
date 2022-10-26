import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
      private route: Router,
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
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imgPath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.get('name').value,
      this.recipeForm.get('description').value,
      this.recipeForm.get('imgPath').value,
      this.recipeForm.get('ingredients').value,
    )
    if(this.editMode) {
      this.recipeService.updateRecipe(this.editedItemId, recipe)
      return this.route.navigate(['../'], {relativeTo: this.router})
    } else {
      this.recipeService.addRecipe(recipe)
    }
    this.route.navigate(['recipes'])
  }

  onCancel() {
    this.route.navigate(['recipes'])
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }


}
