import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        let specialCharacter = /[@,$,#,%,&,*]/.test(control.value)
        const valid = hasNumber && hasUpper && hasLower && specialCharacter;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}