import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  private ingregiantSub: Subscription;

  ngOnInit(): void {
    this.ingrediants = this.shoppingListService.getIngrediants();
    this.ingregiantSub = this.shoppingListService.ingrediantChanged.subscribe(
      (ingrediant: Ingredient[]) => {
        this.ingrediants = ingrediant;
      } 
    )
  }
  onEditItem(index:number){
    this.shoppingListService.editItemStarted.next(index);
  }

  ngOnDestroy(){
    this.ingregiantSub.unsubscribe();
  }
}
