import { FormArray, FormGroup } from "@angular/forms";
import { createOrderRequestModel } from "../../models/orders/createOrderRequestModel";
import { baseOrderForm, BaseOrderForm } from "./baseOrderFormFactory";
import { createOrderItemForm, OrderItemForm } from "./orderItemFormFactory";

export type CreateOrderForm = FormGroup<BaseOrderForm & {
    items: FormArray<OrderItemForm>
}>;

export function createOrderForm(): CreateOrderForm {
    const base = baseOrderForm();

    return new FormGroup({
        ...base,
        // Başlangıçta 1 adet boş ürün satırı ile gelsin
        items: new FormArray([createOrderItemForm()])
    });
}

export function toCreateOrderRequest(form: CreateOrderForm): createOrderRequestModel {
    const rawValue = form.getRawValue();

    return new createOrderRequestModel(
        rawValue.shippingAddress,
        rawValue.appUserId,
        rawValue.items
    );
}