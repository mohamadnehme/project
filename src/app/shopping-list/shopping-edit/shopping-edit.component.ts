import {Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, OnDestroy} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editedItemIndex: number;
  sub: Subscription;
  editedItem: Ingredient;
  constructor(private shopping: ShoppingService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.sub = this.shopping.startEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shopping.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);

    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.shopping.updateIngredient(this.editedItemIndex,newIngredient);
    }
    else {
      this.shopping.addIngredient(newIngredient);
    }
    this.editMode = false;
  }
  onclear(){
    this.slForm.reset();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  ondelete(){
    this.shopping.deleteIngredient(this.editedItemIndex);
    this.onclear();
  }
}
