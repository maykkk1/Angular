import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesResolverService } from './recipe/recipes-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: "", redirectTo: "recipes", pathMatch: 'full'},
  {path: 'recipes',
   component: RecipeComponent,
  children: [
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]
  }, 
  {path: 'shopping-list',component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
