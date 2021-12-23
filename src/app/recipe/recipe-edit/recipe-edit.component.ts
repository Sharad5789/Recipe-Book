import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
    private recipeService: RecipeService,
    private router: Router) {  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipeEditToList(this.id, this.recipeForm.value);
    }else{
      this.recipeService.addRecipeEditToList(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  onAddIngrediant(){
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
  
  onDeleteIngrediant(index:number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngrediants = new FormArray([]);

    const recipe = this.recipeService.getRecipeItem(this.id);
    if(this.editMode){
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingrediants']){
        for(let ingrediant of recipe.ingrediants){
          recipeIngrediants.push(
            new FormGroup({
              'name': new FormControl(ingrediant.name,Validators.required),
              'amount': new FormControl(ingrediant.amount, [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)]
              )
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingrediants': recipeIngrediants
    });
    
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }

}
