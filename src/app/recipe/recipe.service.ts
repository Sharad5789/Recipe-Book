import { Injectable  } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) { }

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger',
  //     'This is recipe of Burger', 
  //     'https://www.thespruceeats.com/thmb/O4xB3FoR7B6ovTpcENFLtQyIuAU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/indian-style-burger-1957599-hero-01-266103a4bb4e4ee7b5feb4da2d2e99da.jpg', 
  //     [
  //        new Ingredient('Meat',1),
  //        new Ingredient('French Fries',20)
  //      ]),
  //   new Recipe(
  //     'Coke', 
  //     'This is recipe of Coke', 
  //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4fibAxxQwaDwyy-ZlU4keIoLv4GuW0VOy-tOseFFP5OfDmp-xpE8eAJnEwlw9tXlxjIQ&usqp=CAU',
  //     [
  //       new Ingredient('Meat',1),
  //       new Ingredient('French Fries',50)
  //     ]),
  //   new Recipe(
  //     'Payment', 
  //     'This is recipe of Payment', 
  //     'https://qualityinspection.org/wp-content/uploads/2012/01/HowtoPayChineseSuppliersbyBankTransferTT.jpg', 
  //     [
  //       new Ingredient('Cradit Card',1),
  //       new Ingredient('Only Cash',100)
  //     ])
  // ];
  private recipes: Recipe[] = []; 

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(recipes.slice());
  }

  getRecipe(){
    return this.recipes.slice();
  }

  getRecipeItem(id: number){
    return this.recipes[id];
  }

  addIngrediantsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngediantFromRecipe(ingredients)
  }

  addRecipeEditToList(newRecipe:Recipe){
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipeEditToList(index:number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
