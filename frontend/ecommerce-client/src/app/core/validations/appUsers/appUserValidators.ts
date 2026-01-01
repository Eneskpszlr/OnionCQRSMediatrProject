import { ValidatorFn, Validators } from "@angular/forms";

export const appUserValidators = {
    userName: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
    ],
    password: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(6), // Şifre en az 6 karakter
    ]
};