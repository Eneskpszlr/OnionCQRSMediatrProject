import { ValidatorFn, Validators } from "@angular/forms";

export const appUserProfileValidators = {
    firstName: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
    ],
    lastName: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
    ],

    appUserId: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(1),
    ],
};