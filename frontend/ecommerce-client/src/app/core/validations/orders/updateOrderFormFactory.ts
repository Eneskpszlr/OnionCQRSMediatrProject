import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { updateOrderRequestModel } from "../../models/orders/updateOrderRequestModel";
import { baseOrderForm, BaseOrderForm } from "./baseOrderFormFactory";
import { OrderItemForm } from "./orderItemFormFactory";

// Tip Tanımlaması
export type UpdateOrderForm = FormGroup<{ id: FormControl<number> } & BaseOrderForm & {
    items: FormArray<OrderItemForm>
}>;

export function updateOrderForm(): UpdateOrderForm {
    const base = baseOrderForm();

    // Update formunda belki adres validasyonunu gevşetilmek istenirse
    // base.shippingAddress.clearValidators();
    // base.shippingAddress.updateValueAndValidity({ emitEvent: false });

    return new FormGroup({
        id: new FormControl<number>(0, {
            nonNullable: true,
            validators: [Validators.required]
        }),
        ...base,
        // Update formunda items başlangıçta BOŞ gelir, veriler gelince dolar.
        items: new FormArray<OrderItemForm>([]) 
    });
}

export function toUpdateOrderRequest(form: UpdateOrderForm): updateOrderRequestModel {
    const rawValue = form.getRawValue();

    return new updateOrderRequestModel(
        rawValue.id,
        rawValue.shippingAddress,
        rawValue.appUserId,
        rawValue.items
    );
}