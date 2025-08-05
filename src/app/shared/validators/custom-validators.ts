import { AbstractControl, ValidatorFn } from '@angular/forms';

// Валидатор для имени и фамилии (только буквы)
export function lettersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isNotLetters :boolean  = !/^[A-Za-zА-Яа-яЁё]+$/.test(control.value);
    return isNotLetters ? { 'lettersOnly': { value: control.value } } : null;
  };
}

// Валидатор для телефона (11 цифр, допускается + в начале)
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const isValid :boolean = /^\+?\d{0,1}(\d{10})$/.test(value);
    return isValid ? null : { 'phoneInvalid': { value } };
  };
}

// Валидатор для адреса (буквы, цифры, пробелы, - и /)
export function addressValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isInvalid :boolean = /[^A-Za-zА-Яа-яЁё0-9\s\-\/]/.test(control.value);
    return isInvalid ? { 'addressInvalid': { value: control.value } } : null;
  };
}
