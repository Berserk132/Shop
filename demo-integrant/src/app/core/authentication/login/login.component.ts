import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators'
import * as customeValidations from 'src/app/shared/validators/custome.validator';
import { ValidationEngine } from 'src/app/shared/validators/validation-engine.validator';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessages: string[] = [];
  isFormSubmited: boolean = false;

  // private validationMessages = {
  //   required: 'Please enter your email address.',
  //   email: 'Please enter a valid email address.'
  // }

  constructor(private router: Router, private accountService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), customeValidations.firstNameNotEqualAhmed]],
      lastName: ['', [Validators.required]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }),
      phone: ['', [Validators.required]],
      notification: 'email',
      rating: [null, [customeValidations.ratingRange(1, 5)]],
      sendCatalog: [''],
      addresses: this.fb.array([this.buildAddress()])
    })

    this.addEmailGroupValidation(this.loginForm.get('emailGroup'))
    this.loginForm.get('emailGroup')?.valueChanges.subscribe({

      next: () => console.log(this.loginForm)
    })


    // const emailControl = this.loginForm.get('emailGroup.email');
    // emailControl?.valueChanges.pipe(
    //   debounceTime(1000)
    // ).subscribe({
    //   next: (value) => this.setMessage(emailControl)
    // })

  }

  get LoginForm() {

    return this.loginForm.controls;
  }

  get addresses(): FormArray {
    return <FormArray>this.loginForm.get('addresses');
  }

  onSubmit() {
    this.errorMessages = ValidationEngine.extractErrors(this.loginForm.controls)
    this.isFormSubmited = true;
    if (ValidationEngine.errorMessage.length > 0) {
      console.log(this.errorMessages)
    }
    else {

      console.log(this.loginForm.get('firstName')?.value + this.loginForm.get('lastName')?.value)
      this.accountService.login(this.loginForm.get('firstName')?.value + ' ' + this.loginForm.get('lastName')?.value);
      this.router.navigate(['/shop']);
    }
  }

  // setMessage(c: AbstractControl): void {
  //   this.emailMessage = '';
  //   if ((c.touched || c.dirty) && c.errors) {
  //     this.emailMessage = Object.keys(c.errors).map(
  //       key => this.validationMessages[key]).join(' ');
  //   }
  // }

  addEmailGroupValidation(c: AbstractControl | null) {

    c?.setValidators(customeValidations.compareEmails)
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  resetForm() {
    this.loginForm.reset();
    this.isFormSubmited = false;
    this.errorMessages = []
  }


  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched && this.isFormSubmited;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

}