import { ValidatorFn, Validators } from "@angular/forms";

export const CategoryValidators = {
    categoryName: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
    ],
    description: (): ValidatorFn[] => [
        Validators.maxLength(500)
    ]
};