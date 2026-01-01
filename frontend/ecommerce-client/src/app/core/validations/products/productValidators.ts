import { ValidatorFn, Validators } from "@angular/forms";

export const ProductValidators = {
    productName: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
    ],
    unitPrice: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(0.01) // 0 ve altı olamaz
    ],
    categoryId: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(1) // Kategori seçimi zorunlu
    ]
};