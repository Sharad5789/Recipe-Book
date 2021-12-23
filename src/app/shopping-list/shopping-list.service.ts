import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingrediantChanged = new  Subject<Ingredient[]>();
  editItemStarted = new Subject<number>();

  private ingrediants: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Oranges', 15)
  ];

  getIngrediants(){
    return this.ingrediants.slice();
  }

  getIngrediant(index:number){
    return this.ingrediants[index];
  }

  addIngrediant(ingrediant: Ingredient){
    this.ingrediants.push(ingrediant);
    this.ingrediantChanged.next(this.ingrediants.slice());  
  }

  addIngediantFromRecipe(ingredients:Ingredient[]){
    this.ingrediants.push(...ingredients);
    this.ingrediantChanged.next(this.ingrediants.slice());
  }

  updateIngrediant(index:number, newIngredient:Ingredient){
    this.ingrediants[index] = newIngredient;
    this.ingrediantChanged.next(this.ingrediants.slice());    
  }

  deleteIngrediant(index: number){
    this.ingrediants.splice(index, 1)
    this.ingrediantChanged.next(this.ingrediants.slice());  
  }

  constructor() { }

}
