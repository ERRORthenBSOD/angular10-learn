import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signUpForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit() {
    const { required, email } = Validators;
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(null, [required, email], this.forbiddenEmails),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([new FormControl([], required)]),
    });
    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.signUpForm.statusChanges.subscribe((status) => {
    //   console.log(status);
    // });
    // this.signUpForm.setValue({
    //   userData: {
    //     username: "Azz",
    //     email: "azz@azz.com",
    //   },
    //   gender: "male",
    //   hobbies: [""],
    // });
    this.signUpForm.patchValue({
      userData: {
        username: "Azz",
      },
    });
  }

  onAddHobby() {
    const control = new FormControl("", Validators.required);
    (<FormArray>this.signUpForm.get("hobbies")).push(control);
  }

  getControls() {
    return (<FormArray>this.signUpForm.get("hobbies")).controls;
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({ gender: "female" });
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.com") {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
