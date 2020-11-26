import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeform: FormGroup;
  constructor(private route:ActivatedRoute,private recipeService: RecipeService,private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] !=null;
          this.initform();
        }
      );
  }
  private initform(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
      this.recipeform = new FormGroup({
        'name' : new FormControl(recipeName, Validators.required),
        'imagePath' : new FormControl(recipeImagePath, Validators.required),
        'description' : new FormControl(recipeDescription, Validators.required),
        'ingredients' : recipeIngredients
      });
  }
  onsubmit(){
    /*const newRecipe = new Recipe(
      this.recipeform.value['name'],
      this.recipeform.value['description'],
      this.recipeform.value['imagePath'],
      this.recipeform.value['ingredients']
    );*/
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeform.value);
    }
    else {
      this.recipeService.AddRecipe(this.recipeform.value);
    }
    this.onCancel();
  }
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeform.get('ingredients')).removeAt(index);
  }
  onAddIngredient(){
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
