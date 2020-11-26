import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping-list/shopping.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shopping: ShoppingService) { }
  // tslint:disable-next-line:typedef
  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(recipes.slice());
  }
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index];
  }
  AddIToS(ingredients: Ingredient[]){
    this.shopping.addIngredients(ingredients);
  }
  AddRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number,recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
