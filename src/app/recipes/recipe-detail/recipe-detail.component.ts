import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  constructor(private recipeService :RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }
  recipe: Recipe;
  id: number;
  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params["id"];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }
  onAddToS(){
    this.recipeService.AddIToS(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
    //this.router.navigate(['../',this.id, 'edit'],{relativeTo: this.route});
  }
  ondeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
