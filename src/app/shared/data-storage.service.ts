import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService{

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService) { }

  storeRecipe(){
    const recipes = this.recipeService.getRecipe();
    this.http.put('https://recipe-book-1f8fd-default-rtdb.firebaseio.com/recipe.json', recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipe(){
      return this.http.get<Recipe[]>('https://recipe-book-1f8fd-default-rtdb.firebaseio.com/recipe.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingrediants: recipe.ingrediants ? recipe.ingrediants : []};
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipe(recipes);
        })
      )
  }

}
