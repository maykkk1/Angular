import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isRecipeComponentVisible = true;
  isShoppingListVisible = false;


  selectSection(section) {
    if(section === 'recipe') {
      this.isRecipeComponentVisible = true;
      this.isShoppingListVisible = false;
    } else {
      this.isShoppingListVisible = true;
      this.isRecipeComponentVisible = false;
    }

  }
}
