import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  recipes: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeChanged
      .subscribe(()=>{
        this.recipes = this.recipeService.getRecipes();
      })
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe()
  }

}
