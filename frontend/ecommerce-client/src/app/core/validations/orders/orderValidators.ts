import { ValidatorFn, Validators } from "@angular/forms";

export const OrderValidators = {
    shippingAddress: (): ValidatorFn[] => [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
    ],
    appUserId: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(1)
    ],
    // --- Ürün Satırı Validatorları ---
    productId: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(1)
    ],
    quantity: (): ValidatorFn[] => [
        Validators.required,
        Validators.min(1),
        Validators.max(100)
    ]
};