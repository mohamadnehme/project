import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes: Recipe[];
  subscription : Subscription;
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }
  // tslint:disable-next-line:typedef
  /*onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }*/
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
