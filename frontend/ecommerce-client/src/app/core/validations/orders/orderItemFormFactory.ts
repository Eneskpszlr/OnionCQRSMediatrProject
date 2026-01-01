import { FormControl, FormGroup } from "@angular/forms";
import { OrderValidators } from "./orderValidators";

// Tek bir satırın tipi
export type OrderItemForm = FormGroup<{
    productId: FormControl<number>;
    quantity: FormControl<number>;
}>;

// Tek bir satır üreten fonksiyon
export function createOrderItemForm(): OrderItemForm {
    return new FormGroup({
        productId: new FormControl<number>(0, { 
            nonNullable: true, 
            validators: OrderValidators.productId() 
        }),
        quantity: new FormControl<number>(1, { 
            nonNullable: true, 
            validators: OrderValidators.quantity() 
        })
    });
}