import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export function compareEmails(c: AbstractControl): ValidationErrors | null{
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');
  if (email?.value !== confirmEmail?.value) {
    return { 'match': true };
  }

  if (email?.pristine || confirmEmail?.pristine) {
    return null;
  }

  return null;
}


export function ratingRange(min: number, max: number): ValidatorFn {

  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  }
}

export function firstNameNotEqualAhmed (c: AbstractControl): ValidationErrors | null {
  if (c.value !== "ahmed") {
    return {'notEqualAhmed': true}
  }
  return null;
}
