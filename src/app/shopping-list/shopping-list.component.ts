import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  constructor(private shopping:ShoppingService) { }
  ingredients: Ingredient[];
  igChangSub: Subscription;

  ngOnInit(): void {
    this.ingredients = this.shopping.getIngredients();

    this.igChangSub = this.shopping.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }
  ngOnDestroy(): void {
    this.igChangSub.unsubscribe();
  }
  onEditItem(index: number){
    this.shopping.startEditing.next(index);
  }
  // tslint:disable-next-line:typedef
  /*onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }*/
}
