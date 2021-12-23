import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:any;
  id: any;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,private router: Router) { 
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = recipeService.getRecipeItem(this.id);
      }
    )
   }

  ngOnInit(): void {
  }

  addShoppingList(){
    this.recipeService.addIngrediantsToShoppingList(this.recipe.ingrediants)
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
