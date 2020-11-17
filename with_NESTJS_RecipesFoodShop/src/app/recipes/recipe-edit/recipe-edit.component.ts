import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['/recipes']);
  }

  onAddIngredient() {
    const { required, pattern } = Validators;
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, required),
        amount: new FormControl(null, [required, pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    const { required, pattern } = Validators;
    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(map((state) => state.recipes.find((r, i) => i === this.id)))
        .subscribe(({ name, imagePath, description, ingredients }) => {
          recipeName = name;
          recipeDescription = description;
          recipeImage = imagePath;
          if (ingredients) {
            for (let ingredient of ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, required),
                  amount: new FormControl(ingredient.amount, [
                    required,
                    pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, required),
      description: new FormControl(recipeDescription, required),
      imagePath: new FormControl(recipeImage, required),
      ingredients: recipeIngredients,
    });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get ingredientsControls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
