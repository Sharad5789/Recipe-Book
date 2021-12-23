import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form') signupForm: NgForm;

  name:any;
  subsciption: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    // this.name = {name:this.route.snapshot.params['name']};
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    this.route.params.subscribe(
      (params: any) => {
        this.name = params['name'];
      }
    )
    this.subsciption = this.shoppingListService.editItemStarted
    .subscribe((index:number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngrediant(index);
      this.signupForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }
  onAddItem(form:NgForm){
    const ingValue = form.value;
    const newIngredient = new Ingredient(ingValue.name,ingValue.amount);
    if(this.editMode){
      this.shoppingListService.updateIngrediant(this.editedItemIndex, newIngredient)
    }
    else{
      this.shoppingListService.addIngrediant(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.shoppingListService.deleteIngrediant(this.editedItemIndex)
    this.onClear();
  }

  onClear(){
    this.signupForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.subsciption.unsubscribe();
  }


}
